import React, { useState } from "react";

import { PillButton } from "../../../../components/pillButton/PillButton";
import WaitingOnBoosterView from "./WaitingOnBoosterView";
import BoosterCardsView from "./BoosterCardsView";
import BoosterLoadingZone from "./BoosterLoadingZone";

import "./BoosterView.scss";

export default function BoosterView({ draft, getDraft, booster, isBoosterLoading, sortableBooster, submitPick }) {
    const [selectedCardId, setSelectedCardId] = useState(null);

    return (
        <>
            <div className="booster-view-header">
                <h2>
                    Pack {draft?.packNumber}
                    {booster?.pickNumber && `, Pick ${booster?.pickNumber}`}
                </h2>
                <PillButton onClick={handleSubmit} className="submit-pick" disabled={!selectedCardId}>
                    Submit Pick
                </PillButton>
            </div>
            {booster && !booster.cards && <WaitingOnBoosterView getDraft={getDraft} pickNumber={booster?.pickNumber} />}
            {!(booster && !booster.cards) && isBoosterLoading && (
                <BoosterLoadingZone pickNumber={booster?.pickNumber} />
            )}
            {!isBoosterLoading && booster?.cards && (
                <BoosterCardsView {...{ booster, sortableBooster, selectedCardId, setSelectedCardId }} />
            )}
            <div className="booster-view-footer">
                <PillButton onClick={handleSubmit} className="submit-pick" disabled={!selectedCardId}>
                    Submit Pick
                </PillButton>
            </div>
        </>
    );

    function handleSubmit() {
        submitPick(selectedCardId);
        setSelectedCardId(null);
    }
}
