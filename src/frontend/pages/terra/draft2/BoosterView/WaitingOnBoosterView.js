import React from "react";

import { CARDS_IN_PACK } from "../../../../../config";
import LoadingSpinner from "../../../../components/loadingSpinner/LoadingSpinner";
import { useAutoRefresh } from "../../../../helpers/useAutoRefresh";

export default function WaitingOnBoosterView({ getDraft, pickNumber }) {
    useAutoRefresh(getDraft);

    return (
        <div className={`waiting-on-booster-view cards-${CARDS_IN_PACK + 1 - (pickNumber || 1)}`}>
            <p>Waiting for others to make their picks...</p>
            <LoadingSpinner />
        </div>
    );
}
