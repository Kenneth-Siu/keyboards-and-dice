import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import { difference, flatten, sum } from "lodash";

import { DRAFT_STATUSES } from "../../../../../config";
import * as CookieHelper from "../../../../helpers/CookieHelper";
import { getCard } from "../../../../../shared/cardList";
import * as DraftsApi from "../../../../api/DraftsApi";
import { asyncTry } from "../../../../helpers/asyncTry";
import BasicsControlPanel from "./BasicsControlPanel";
import CopyDeckButton from "./CopyDeckButton";
import PicksRow from "./PicksRow";

import "./PicksView.scss";
import { getDefaultRowColumnForCard, getDraftCookieName } from "../DraftHelpers";

export default function PicksView({ draft, booster, picks, setPicks, sortablePicks, setSortablePicks }) {
    const { draftId } = useParams();

    const [basics, setBasics] = useState(null);

    useEffect(getPicks, []);

    const totalBasics = basics && basics.plains + basics.islands + basics.swamps + basics.mountains + basics.forests;
    const numOfCardsInMaindeck = sum(
        Object.keys(sortablePicks)
            .filter((containerId) => containerId.startsWith("deck"))
            .map((key) => sortablePicks[key].length)
    );
    const numOfCardsInSideboard = sum(
        Object.keys(sortablePicks)
            .filter((containerId) => containerId.startsWith("sideboard"))
            .map((key) => sortablePicks[key].length)
    );

    return (
        <>
            <div className="picks-view-heading">
                <h2>
                    Deck{" "}
                    <small>
                        ({numOfCardsInMaindeck} cards{totalBasics && `, ${totalBasics} basics`})
                    </small>
                </h2>
                {draft.status === DRAFT_STATUSES.COMPLETE && (
                    <>
                        <BasicsControlPanel {...{ basics, setBasics }} />
                        <CopyDeckButton copyCallback={copyPicksToClipboard} />
                    </>
                )}
            </div>
            <PicksRow containerIdStartsWith="deckRow0" {...{ booster, picks, sortablePicks }} />
            <PicksRow containerIdStartsWith="deckRow1" {...{ booster, picks, sortablePicks }} />
            <div className="picks-view-heading">
                <h2>
                    Sideboard <small>({numOfCardsInSideboard} cards)</small>
                </h2>
            </div>
            <PicksRow containerIdStartsWith="sideboardRow0" {...{ booster, picks, sortablePicks }} />
            <PicksRow containerIdStartsWith="sideboardRow1" {...{ booster, picks, sortablePicks }} />
        </>
    );

    function getPicks() {
        if (!picks) {
            asyncTry(
                async () => {
                    const responsePicks = await DraftsApi.getPicks(draftId);
                    setPicks(
                        responsePicks.map((card) => {
                            return { id: card.id, ...getCard(card.cardId) };
                        })
                    );

                    const cookieSortablePicks = CookieHelper.get(getDraftCookieName(draftId)) || sortablePicks;
                    const responsePicksCardIds = responsePicks.map((card) => card.id);
                    const deck = flatten(
                        Object.keys(cookieSortablePicks).map((containerId) => cookieSortablePicks[containerId])
                    );
                    const unsortedCards = difference(responsePicksCardIds, deck);
                    unsortedCards.forEach((cardId) =>
                        cookieSortablePicks[getDefaultRowColumnForCard(getCard(cardId))].push(getCard(cardId))
                    );

                    setSortablePicks(cookieSortablePicks);
                },
                () => {}
            );
        }
    }

    function copyPicksToClipboard() {
        const deck = flatten(
            Object.keys(sortablePicks)
                .filter((containerId) => containerId.startsWith("deck"))
                .map((containerId) => sortablePicks[containerId])
        ).map((id) => `1 ${picks.find((pick) => pick.id === id).name}`);

        if (basics?.plains) {
            deck.push(`${basics.plains} Plains`);
        }
        if (basics?.islands) {
            deck.push(`${basics.islands} Island`);
        }
        if (basics?.swamps) {
            deck.push(`${basics.swamps} Swamp`);
        }
        if (basics?.mountains) {
            deck.push(`${basics.mountains} Mountain`);
        }
        if (basics?.forests) {
            deck.push(`${basics.forests} Forest`);
        }

        const sideboard = flatten(
            Object.keys(sortablePicks)
                .filter((containerId) => containerId.startsWith("sideboard"))
                .map((containerId) => sortablePicks[containerId])
        ).map((id) => `1 ${picks.find((pick) => pick.id === id).name}`);
        sideboard.push("10 Plains", "10 Island", "10 Swamp", "10 Mountain", "10 Forest");

        copy(deck.join("\n") + "\n\n" + sideboard.join("\n"));
    }
}
