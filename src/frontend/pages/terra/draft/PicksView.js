import { flatten } from "lodash";
import React, { useEffect } from "react";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { asyncTry } from "../../../helpers/asyncTry";
import * as CookieHelper from "../../../helpers/CookieHelper.js";
import { CopyDeckButton } from "./CopyDeckButton";
import { PicksRow } from "./PicksRow";
import * as DraftsApi from "../../../api/DraftsApi.js";
import { getCard } from "../../../../shared/cardList";
import "./PicksView.scss";

export function PicksView({
    draftId,
    picksLoaded,
    setPicksLoaded,
    picks,
    setPicks,
    showDeckbuilderPanels,
    basicsControlPanel,
    totalBasics,
    copyPicksToClipboard,
}) {
    const cookieName = `draft-${draftId}`;

    useEffect(getPicks, []);

    if (!picksLoaded) {
        return <LoadingSpinner />;
    }

    return (
        <div className="picks-view">
            <div className="picks-heading">
                <h2>
                    Deck{" "}
                    <small>
                        ({flatten(picks.deckCreatures).length + flatten(picks.deckNonCreatures).length} cards
                        {totalBasics > 0 ? `, ${totalBasics} basics` : ""})
                    </small>
                </h2>
                {showDeckbuilderPanels && (
                    <>
                        {basicsControlPanel}
                        <CopyDeckButton copyCallback={copyPicksToClipboard} />
                    </>
                )}
            </div>
            <PicksRow row={picks.deckCreatures} cardOnClick={moveCreatureFromDeckToSideboard} />
            <PicksRow row={picks.deckNonCreatures} cardOnClick={moveNonCreatureFromDeckToSideboard} />
            <div className="picks-heading">
                <h2>
                    Sideboard{" "}
                    <small>
                        ({flatten(picks.sideboardCreatures).length + flatten(picks.sideboardNonCreatures).length} cards)
                    </small>
                </h2>
            </div>
            <PicksRow row={picks.sideboardCreatures} cardOnClick={moveCreatureFromSideboardToDeck} />
            <PicksRow row={picks.sideboardNonCreatures} cardOnClick={moveNonCreatureFromSideboardToDeck} />
        </div>
    );

    function getPicks() {
        if (!picksLoaded) {
            asyncTry(
                async () => {
                    const responsePicks = await DraftsApi.getPicks(draftId);
                    setPicksLoaded(true);
                    getFromCookie(responsePicks.map((cardId) => getCard(cardId)));
                },
                () => {
                    setPicksLoaded(true);
                }
            );
        }
    }

    function setCookie() {
        const cookiePicksCardIds = {
            deckCreatures: picks.deckCreatures.map((column) => column.map((card) => card.id)),
            deckNonCreatures: picks.deckNonCreatures.map((column) => column.map((card) => card.id)),
            sideboardCreatures: picks.sideboardCreatures.map((column) => column.map((card) => card.id)),
            sideboardNonCreatures: picks.sideboardNonCreatures.map((column) => column.map((card) => card.id)),
        };
        CookieHelper.set(cookieName, cookiePicksCardIds);
    }

    function getFromCookie(cards) {
        const cookiePicksCardIds = CookieHelper.get(cookieName, {
            deckCreatures: [[], [], [], [], [], [], [], []],
            deckNonCreatures: [[], [], [], [], [], [], [], []],
            sideboardCreatures: [[], [], [], [], [], [], [], []],
            sideboardNonCreatures: [[], [], [], [], [], [], [], []],
        });
        const cookieDeckCreatures = cookiePicksCardIds.deckCreatures.map((column) =>
            column.map((cardId) => getCard(cardId))
        );
        const cookieDeckNonCreatures = cookiePicksCardIds.deckNonCreatures.map((column) =>
            column.map((cardId) => getCard(cardId))
        );
        const cookieSideboardCreatures = cookiePicksCardIds.sideboardCreatures.map((column) =>
            column.map((cardId) => getCard(cardId))
        );
        const cookieSideboardNonCreatures = cookiePicksCardIds.sideboardNonCreatures.map((column) =>
            column.map((cardId) => getCard(cardId))
        );

        const cookieCards = [
            ...flatten(cookieDeckCreatures),
            ...flatten(cookieDeckNonCreatures),
            ...flatten(cookieSideboardCreatures),
            ...flatten(cookieSideboardNonCreatures),
        ];
        const newCards = reckonNewCards(cards, cookieCards);
        newCards.forEach((card) => {
            const column = card.manaValue === 0 ? 7 : Math.min(6, card.manaValue - 1);
            if (card.type.includes("Creature")) {
                cookieDeckCreatures[column].push(card);
            } else {
                cookieDeckNonCreatures[column].push(card);
            }
        });
        setPicks({
            deckCreatures: cookieDeckCreatures,
            deckNonCreatures: cookieDeckNonCreatures,
            sideboardCreatures: cookieSideboardCreatures,
            sideboardNonCreatures: cookieSideboardNonCreatures,
        });
    }

    function reckonNewCards(incomingCards, existingCards) {
        const newCards = [];
        while (incomingCards.length) {
            const card = incomingCards.shift();
            const index = existingCards.findIndex((cookieCard) => cookieCard.id === card.id);
            if (index !== -1) {
                existingCards.splice(index, 1);
            } else {
                newCards.push(card);
            }
        }
        return newCards;
    }

    function moveCreatureFromDeckToSideboard(column, row) {
        picks.sideboardCreatures[column].push(picks.deckCreatures[column][row]);
        picks.deckCreatures[column].splice(row, 1);
        setPicks({ ...picks });
        setCookie();
    }

    function moveNonCreatureFromDeckToSideboard(column, row) {
        picks.sideboardNonCreatures[column].push(picks.deckNonCreatures[column][row]);
        picks.deckNonCreatures[column].splice(row, 1);
        setPicks({ ...picks });
        setCookie();
    }

    function moveCreatureFromSideboardToDeck(column, row) {
        picks.deckCreatures[column].push(picks.sideboardCreatures[column][row]);
        picks.sideboardCreatures[column].splice(row, 1);
        setPicks({ ...picks });
        setCookie();
    }

    function moveNonCreatureFromSideboardToDeck(column, row) {
        picks.deckNonCreatures[column].push(picks.sideboardNonCreatures[column][row]);
        picks.sideboardNonCreatures[column].splice(row, 1);
        setPicks({ ...picks });
        setCookie();
    }
}
