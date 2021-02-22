import React from "react";
import "./PlayerPill.scss";

export default function PlayerPill({ player, loggedInUserId, ...rest }) {
    return (
        <span className={`player-pill ${player.userId === loggedInUserId ? "current-user" : ""}`} {...rest}>
            {player.displayName}
        </span>
    );
}
