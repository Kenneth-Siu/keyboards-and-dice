import React from "react";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { useAutoRefresh } from "../../helpers/useAutoRefresh";
import "./WaitingOnBoosterView.scss";

export function RefreshButtonView({ getDraft, className }) {
    useAutoRefresh(getDraft);

    return (
        <div className={`refresh-button-view ${className}`}>
            <p>Waiting for others to make their picks...</p>
            <LoadingSpinner />
        </div>
    );
}
