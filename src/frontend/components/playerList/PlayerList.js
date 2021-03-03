import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./PlayerList.scss";

export const CHEVRON_DIRECTION = Object.freeze({
    LEFT: 1,
    RIGHT: 2,
});

export function PlayerList({ players, loggedInUser, chevronDirection }) {
    return (
        <>
            {players.map((player, index) => (
                <div key={index} className="player-pill-div">
                    {chevronDirection && (chevronDirection === CHEVRON_DIRECTION.LEFT || index === 0) && (
                        <Chevron chevronDirection={chevronDirection} />
                    )}
                    <PlayerPill player={player} />
                    {chevronDirection &&
                        (chevronDirection === CHEVRON_DIRECTION.RIGHT || index === players.length - 1) && (
                            <Chevron chevronDirection={chevronDirection} />
                        )}
                </div>
            ))}
        </>
    );

    function Chevron({ chevronDirection }) {
        if (chevronDirection === CHEVRON_DIRECTION.LEFT) {
            return <MdChevronLeft className="player-list-chevron" />;
        }
        if (chevronDirection === CHEVRON_DIRECTION.RIGHT) {
            return <MdChevronRight className="player-list-chevron" />;
        }
        return null;
    }

    function PlayerPill({ player }) {
        return (
            <span className={`player-pill ${player.userId === loggedInUser.id ? "current-user" : ""}`}>
                {player.displayName}
            </span>
        );
    }
}
