import React from "react";
import { useDroppable } from "@dnd-kit/core";

import "./PicksColumn.scss";

export default function SortableColumn({ id, children }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div className="picks-column" ref={setNodeRef}>
            {children}
        </div>
    );
}
