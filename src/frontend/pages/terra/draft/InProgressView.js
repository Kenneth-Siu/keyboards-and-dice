import React from "react";
import { PillButton } from "../../../components/pillButton/PillButton";
import { CARDS_IN_PACK } from "../../../../config";
import { RefreshButtonView } from "./WaitingOnBoosterView";
import { BoosterView } from "./BoosterView";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";

export function InProgressView({
    packNumber,
    pickNumber,
    selectedCardIndex,
    setSelectedCardIndex,
    submitPick,
    boosterLoading,
    boosterCards,
    getDraft,
}) {
    return (
        <>
            <div className="pack-heading">
                <h2>
                    Pack {packNumber}
                    {pickNumber !== null ? `, Pick ${pickNumber}` : ""}
                </h2>
                <PillButton onClick={submitPick} className="submit-pick" disabled={selectedCardIndex === null}>
                    Submit Pick
                </PillButton>
            </div>
            {boosterLoading && (
                <div className={`booster-loading cards-${CARDS_IN_PACK + 1 - (pickNumber || 1)}`}>
                    <LoadingSpinner />
                </div>
            )}
            {boosterCards === null && (
                <RefreshButtonView getDraft={getDraft} className={`cards-${CARDS_IN_PACK + 1 - (pickNumber || 1)}`} />
            )}
            {!boosterLoading && boosterCards && (
                <BoosterView
                    cards={boosterCards}
                    selectedCardIndex={selectedCardIndex}
                    setSelectedCardIndex={setSelectedCardIndex}
                />
            )}
            <PillButton onClick={submitPick} className="submit-pick" disabled={selectedCardIndex === null}>
                Submit Pick
            </PillButton>
        </>
    );
}
