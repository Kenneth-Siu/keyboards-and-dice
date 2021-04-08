import React, { useEffect } from "react";
import { asyncTry } from "../../../helpers/asyncTry";
import * as DraftsApi from "../../../api/DraftsApi.js";
import { getCard } from "../../../../shared/cardList";
import "./SortablePicks.scss";
import { SortableRow } from "./SortableRow";
import { CopyDeckButton } from "./CopyDeckButton";

export function SortablePicks({
    draftId,
    picksLoaded,
    setPicksLoaded,
    picks,
    setPicks,
    picksPiles,
    setPicksPiles,
    showDeckbuilderPanels,
    totalBasics,
    basicsControlPanel,
    copyPicksToClipboard,
}) {
    useEffect(getPicks, []);

    return (
        <>
            <div className="picks-heading">
                <h2>
                    Deck{" "}
                    <small>
                        ({Object.keys(picksPiles).filter((containerId) => containerId.startsWith("deck")).length} cards
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
            <SortableRow picks={picks} picksPiles={picksPiles} containerIdStartsWith="deckRow0" />
            <SortableRow picks={picks} picksPiles={picksPiles} containerIdStartsWith="deckRow1" />
            <div className="picks-heading">
                <h2>
                    Sideboard{" "}
                    <small>
                        ({Object.keys(picksPiles).filter((containerId) => containerId.startsWith("sideboard")).length}{" "}
                        cards)
                    </small>
                </h2>
            </div>
            <SortableRow picks={picks} picksPiles={picksPiles} containerIdStartsWith="sideboardRow0" />
            <SortableRow picks={picks} picksPiles={picksPiles} containerIdStartsWith="sideboardRow1" />
        </>
    );

    function getPicks() {
        if (!picksLoaded) {
            asyncTry(
                async () => {
                    const responsePicks = await DraftsApi.getPicks(draftId);
                    setPicksLoaded(true);
                    setPicks(
                        responsePicks.map((card) => {
                            return { id: card.id, ...getCard(card.cardId) };
                        })
                    );
                    setPicksPiles((picksPiles) => {
                        return { ...picksPiles, deckRow0Cmc0: responsePicks.map((card) => card.id) };
                    });
                    // getFromCookie(responsePicks.map((cardId) => getCard(cardId)));
                },
                () => {
                    setPicksLoaded(true);
                }
            );
        }
    }
}
