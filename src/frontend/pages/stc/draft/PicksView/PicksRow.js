import React from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import PicksCard from "./PicksCard";
import PicksColumn from "./PicksColumn";

import "./PicksRow.scss";

export default function PicksRow({ booster, picks, sortablePicks, containerIdStartsWith }) {
    return (
        <div className="picks-row-container">
            <div className="picks-row">
                {Object.keys(sortablePicks)
                    .filter((containerId) => containerId.startsWith(containerIdStartsWith))
                    .map((containerId) => (
                        <SortableContext
                            key={containerId}
                            items={sortablePicks[containerId]}
                            strategy={rectSortingStrategy}
                        >
                            <PicksColumn id={containerId}>
                                {sortablePicks[containerId].map((pickId, index) => (
                                    <PicksCard
                                        key={pickId}
                                        id={pickId}
                                        index={index}
                                        src={
                                            (
                                                picks.find((pick) => pick.id === pickId) ||
                                                booster.cards.find((card) => card.id === pickId)
                                            ).imageName
                                        }
                                    />
                                ))}
                            </PicksColumn>
                        </SortableContext>
                    ))}
            </div>
        </div>
    );
}
