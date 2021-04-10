import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import PicksCard from "./PicksCard";
import PicksColumn from "./PicksColumn";

import "./PicksRow.scss";

export default function PicksRow({ picks, sortablePicks, containerIdStartsWith }) {
    return (
        <div className="picks-row">
            {Object.keys(sortablePicks)
                .filter((containerId) => containerId.startsWith(containerIdStartsWith))
                .map((containerId) => (
                    <SortableContext
                        key={containerId}
                        items={sortablePicks[containerId]}
                        strategy={verticalListSortingStrategy}
                    >
                        <PicksColumn id={containerId} column={sortablePicks[containerId]}>
                            {sortablePicks[containerId].map((pickId, index) => (
                                <PicksCard
                                    key={pickId}
                                    id={pickId}
                                    index={index}
                                    src={picks.find((pick) => pick.id === pickId).imageName}
                                />
                            ))}
                        </PicksColumn>
                    </SortableContext>
                ))}
        </div>
    );
}
