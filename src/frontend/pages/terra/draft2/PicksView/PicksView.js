import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import copy from "copy-to-clipboard";

import { DRAFT_STATUSES } from "../../../../../config";
import { getCard } from "../../../../../shared/cardList";
import * as DraftsApi from "../../../../api/DraftsApi";
import { asyncTry } from "../../../../helpers/asyncTry";
import { CopyDeckButton } from "./CopyDeckButton";
import PicksRow from "./PicksRow";

import "./PicksView.scss";
import { sum } from "lodash";

export default function PicksView({ draft, picks, setPicks, sortablePicks, setSortablePicks }) {
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
            <PicksRow containerIdStartsWith="deckRow0" {...{ picks, sortablePicks }} />
            <PicksRow containerIdStartsWith="deckRow1" {...{ picks, sortablePicks }} />
            <div className="picks-view-heading">
                <h2>
                    Sideboard <small>({numOfCardsInSideboard} cards)</small>
                </h2>
            </div>
            <PicksRow containerIdStartsWith="sideboardRow0" {...{ picks, sortablePicks }} />
            <PicksRow containerIdStartsWith="sideboardRow1" {...{ picks, sortablePicks }} />
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
                    setSortablePicks((sortablePicks) => {
                        return { ...sortablePicks, deckRow0Cmc0: responsePicks.map((card) => card.id) };
                    });
                    // getFromCookie(responsePicks.map((cardId) => getCard(cardId)));
                },
                () => {}
            );
        }
    }

    function copyPicksToClipboard() {
        // const deck = [...flatten(picks.deckCreatures), ...flatten(picks.deckNonCreatures)].map(
        //     (card) => `1 ${card.name}`
        // );
        // if (basics.plains) {
        //     deck.push(`${basics.plains} Plains`);
        // }
        // if (basics.islands) {
        //     deck.push(`${basics.islands} Island`);
        // }
        // if (basics.swamps) {
        //     deck.push(`${basics.swamps} Swamp`);
        // }
        // if (basics.mountains) {
        //     deck.push(`${basics.mountains} Mountain`);
        // }
        // if (basics.forests) {
        //     deck.push(`${basics.forests} Forest`);
        // }
        // const sideboard = [...flatten(picks.sideboardCreatures), ...flatten(picks.sideboardNonCreatures)].map(
        //     (card) => `1 ${card.name}`
        // );
        // sideboard.push("10 Plains", "10 Island", "10 Swamp", "10 Mountain", "10 Forest");
        // copy(deck.join("\n") + "\n\n" + sideboard.join("\n"));
    }
}
