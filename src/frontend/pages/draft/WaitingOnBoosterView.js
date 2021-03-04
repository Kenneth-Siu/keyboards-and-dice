import React from "react";
import { RotatingLoadingIcon } from "../../components/rotatingLoadingIcon/RotatingLoadingIcon";
import { useAutoRefresh } from "../../helpers/useAutoRefresh";
import "./WaitingOnBoosterView.scss";

export function RefreshButtonView({ getDraft }) {
    useAutoRefresh(getDraft);

    return (
        <div className="refresh-button-view">
            <p>Waiting for others to make their picks...</p>
            <RotatingLoadingIcon />
        </div>
    );
}
