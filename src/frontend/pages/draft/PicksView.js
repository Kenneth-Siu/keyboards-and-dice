import { flatten } from "lodash";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { asyncTry } from "../../helpers/asyncTry";
import * as CookieHelper from "../../helpers/CookieHelper.js";
import { BasicsControlPanel } from "./BasicsControlPanel";
import { CopyDeckButton } from "./CopyDeckButton";
import { PicksRow } from "./PicksRow";
import * as DraftsApi from "../../api/DraftsApi.js";
import { getCard } from "../../../shared/cardList";
import "./PicksView.scss";
import copy from "copy-to-clipboard";

export function PicksView({
    draftId,
    picksLoaded,
    setPicksLoaded,
    deckCreatures,
    setDeckCreatures,
    deckNonCreatures,
    setDeckNonCreatures,
    sideboardCreatures,
    setSideboardCreatures,
    sideboardNonCreatures,
    setSideboardNonCreatures,
    showDeckbuilderPanels,
    numberOfPlains,
    setNumberOfPlains,
    numberOfIslands,
    setNumberOfIslands,
    numberOfSwamps,
    setNumberOfSwamps,
    numberOfMountains,
    setNumberOfMountains,
    numberOfForests,
    setNumberOfForests,
}) {
    const cookieName = `draft-${draftId}`;
    const totalBasics = numberOfPlains + numberOfIslands + numberOfSwamps + numberOfMountains + numberOfForests;

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
                        ({flatten(deckCreatures).length + flatten(deckNonCreatures).length} cards
                        {totalBasics > 0 ? `, ${totalBasics} basics` : ""})
                    </small>
                </h2>
                {showDeckbuilderPanels && (
                    <>
                        <BasicsControlPanel
                            {...{
                                draftId,
                                numberOfPlains,
                                setNumberOfPlains,
                                numberOfIslands,
                                setNumberOfIslands,
                                numberOfSwamps,
                                setNumberOfSwamps,
                                numberOfMountains,
                                setNumberOfMountains,
                                numberOfForests,
                                setNumberOfForests,
                            }}
                        />
                        <CopyDeckButton copyCallback={copyPicksToClipboard} />
                    </>
                )}
            </div>
            <PicksRow row={deckCreatures} cardOnClick={moveCreatureFromDeckToSideboard} />
            <PicksRow row={deckNonCreatures} cardOnClick={moveNonCreatureFromDeckToSideboard} />
            <div className="picks-heading">
                <h2>
                    Sideboard{" "}
                    <small>({flatten(sideboardCreatures).length + flatten(sideboardNonCreatures).length} cards)</small>
                </h2>
            </div>
            <PicksRow row={sideboardCreatures} cardOnClick={moveCreatureFromSideboardToDeck} />
            <PicksRow row={sideboardNonCreatures} cardOnClick={moveNonCreatureFromSideboardToDeck} />
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
            deckCreatures: deckCreatures.map((column) => column.map((card) => card.id)),
            deckNonCreatures: deckNonCreatures.map((column) => column.map((card) => card.id)),
            sideboardCreatures: sideboardCreatures.map((column) => column.map((card) => card.id)),
            sideboardNonCreatures: sideboardNonCreatures.map((column) => column.map((card) => card.id)),
        };
        CookieHelper.set(cookieName, cookiePicksCardIds);
    }

    function getFromCookie(cards) {
        const cookiePicksCardIds = CookieHelper.get(cookieName, {
            deckCreatures: getEmptyRow(),
            deckNonCreatures: getEmptyRow(),
            sideboardCreatures: getEmptyRow(),
            sideboardNonCreatures: getEmptyRow(),
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
        setDeckCreatures(cookieDeckCreatures);
        setDeckNonCreatures(cookieDeckNonCreatures);
        setSideboardCreatures(cookieSideboardCreatures);
        setSideboardNonCreatures(cookieSideboardNonCreatures);
    }

    function getEmptyRow() {
        return [[], [], [], [], [], [], [], []];
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
        sideboardCreatures[column].push(deckCreatures[column][row]);
        deckCreatures[column].splice(row, 1);
        setSideboardCreatures([...sideboardCreatures]);
        setDeckCreatures([...deckCreatures]);
        setCookie();
    }

    function moveNonCreatureFromDeckToSideboard(column, row) {
        sideboardNonCreatures[column].push(deckNonCreatures[column][row]);
        deckNonCreatures[column].splice(row, 1);
        setSideboardNonCreatures([...sideboardNonCreatures]);
        setDeckNonCreatures([...deckNonCreatures]);
        setCookie();
    }

    function moveCreatureFromSideboardToDeck(column, row) {
        deckCreatures[column].push(sideboardCreatures[column][row]);
        sideboardCreatures[column].splice(row, 1);
        setDeckCreatures([...deckCreatures]);
        setSideboardCreatures([...sideboardCreatures]);
        setCookie();
    }

    function moveNonCreatureFromSideboardToDeck(column, row) {
        deckNonCreatures[column].push(sideboardNonCreatures[column][row]);
        sideboardNonCreatures[column].splice(row, 1);
        setDeckNonCreatures([...deckNonCreatures]);
        setSideboardNonCreatures([...sideboardNonCreatures]);
        setCookie();
    }

    function copyPicksToClipboard() {
        const deck = [...flatten(deckCreatures), ...flatten(deckNonCreatures)].map((card) => `1 ${card.name}`);
        if (numberOfPlains) {
            deck.push(`${numberOfPlains} Plains`);
        }
        if (numberOfIslands) {
            deck.push(`${numberOfIslands} Island`);
        }
        if (numberOfSwamps) {
            deck.push(`${numberOfSwamps} Swamp`);
        }
        if (numberOfMountains) {
            deck.push(`${numberOfMountains} Mountain`);
        }
        if (numberOfForests) {
            deck.push(`${numberOfForests} Forest`);
        }
        const sideboard = [...flatten(sideboardCreatures), ...flatten(sideboardNonCreatures)].map(
            (card) => `1 ${card.name}`
        );
        sideboard.push("10 Plains", "10 Island", "10 Swamp", "10 Mountain", "10 Forest");

        copy(deck.join("\n") + "\n\n" + sideboard.join("\n"));
    }
}
