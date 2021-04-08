import React from "react";
import "./SortableColumn.scss";
import { useDroppable } from "@dnd-kit/core";

export function SortableColumn({ id, column, children }) {
    const nameBarHeight = 1.85;
    const cardHeight = 16.664;
    
    const { setNodeRef } = useDroppable({ id });

    return (
        <div
            className="picks-column"
            ref={setNodeRef}
            style={{ height: `${Math.max(0, column.length - 1) * nameBarHeight + cardHeight}vw` }}
        >
            {children}
        </div>
    );
}
