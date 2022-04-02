import React from "react";

import { useAutoRefresh } from "../../../../helpers/useAutoRefresh";
import BoosterLoadingZone from "./BoosterLoadingZone";

export default function WaitingOnBoosterView({ getDraft, pickNumber }) {
    useAutoRefresh(getDraft);

    return (
        <BoosterLoadingZone pickNumber={pickNumber}>
            <p>Waiting for others to make their picks...</p>
        </BoosterLoadingZone>
    );
}
