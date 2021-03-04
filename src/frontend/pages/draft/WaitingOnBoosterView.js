import React, { useEffect, useRef } from "react";
import { RotatingLoadingIcon } from "../../components/rotatingLoadingIcon/RotatingLoadingIcon";
import { AUTO_REFRESH_INTERVAL } from "../../config";
import "./WaitingOnBoosterView.scss";

export function RefreshButtonView({ getDraft }) {
    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(() => getDraft(), AUTO_REFRESH_INTERVAL);
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div className="refresh-button-view">
            <p>Waiting for others to make their picks...</p>
            <RotatingLoadingIcon />
        </div>
    );
}
