import React from "react";

import { CARDS_IN_PACK } from "../../../../../config";
import LoadingSpinner from "../../../../components/loadingSpinner/LoadingSpinner";

import "./BoosterLoadingZone.scss";

export default function BoosterLoadingZone({ pickNumber, children }) {
    return (
        <div className="booster-loading-zone">
            {[...Array(CARDS_IN_PACK + 1 - (pickNumber || 1))].map((_, index) => (
                <div key={index} className="spacer"><div></div></div>
            ))}
            {children ? <div className="content">{children}</div> : null}
            <LoadingSpinner />
        </div>
    );
}
