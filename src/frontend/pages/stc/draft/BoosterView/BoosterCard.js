import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import CardImage from "../../../../components/cardImages/CardImage";

import "./BoosterCard.scss";

export default function BoosterCard({ id, selected, src, ...rest }) {
    const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

    const style = {
        opacity: isDragging ? 0.5 : null,
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            className={`booster-card-container${selected ? " selected" : ""}`}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            {...rest}
        >
            <CardImage src={src} />
        </div>
    );
}
