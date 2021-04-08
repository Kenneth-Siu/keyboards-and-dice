import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableCard } from "./SortableCard";
import { SortableColumn } from "./SortableColumn";
import "./SortableRow.scss";

export function SortableRow({ picks, picksPiles, containerIdStartsWith }) {
    return (
        <div className="picks-row">
            {Object.keys(picksPiles)
                .filter((containerId) => containerId.startsWith(containerIdStartsWith))
                .map((containerId) => (
                    <SortableContext
                        key={containerId}
                        items={picksPiles[containerId]}
                        strategy={verticalListSortingStrategy}
                    >
                        <SortableColumn id={containerId} column={picksPiles[containerId]}>
                            {picksPiles[containerId].map((pickId) => (
                                <SortableCard
                                    key={pickId}
                                    id={pickId}
                                    src={picks.find((pick) => pick.id === pickId).imageName}
                                />
                            ))}
                        </SortableColumn>
                    </SortableContext>
                ))}
        </div>
    );
}
