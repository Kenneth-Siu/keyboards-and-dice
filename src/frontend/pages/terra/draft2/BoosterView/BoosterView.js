import React, { useState } from "react";

import { PillButton } from "../../../../components/pillButton/PillButton";
import WaitingOnBoosterView from "./WaitingOnBoosterView";
import BoosterCardsView from "./BoosterCardsView";
import BoosterLoadingZone from "./BoosterLoadingZone";

import "./BoosterView.scss";

export default function BoosterView({ draft, getDraft, booster, handlePickSubmission }) {
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
            {!booster.cards && <WaitingOnBoosterView getDraft={getDraft} pickNumber={booster?.pickNumber} />}
            {booster.isLoading && booster.cards && <BoosterLoadingZone pickNumber={booster?.pickNumber} />}
            {!booster.isLoading && booster.cards && (
                <BoosterCardsView {...{ booster, selectedCardId, setSelectedCardId }} />
            )}
            <div className="booster-view-footer">
                <PillButton onClick={handleSubmit} className="submit-pick" disabled={!selectedCardId}>
                    Submit Pick
                </PillButton>
            </div>
        </>
    );

    function handleSubmit() {
        handlePickSubmission(selectedCardId);
        setSelectedCardId(null);
    }
}
