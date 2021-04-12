import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import CardImage from "../../../../components/cardImages/MagicCardImage";

import "./BoosterCard.scss";

export default function BoosterCard({ id, onClick, selected, src, ...rest }) {
    const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

    const style = {
        opacity: isDragging ? 0.5 : null,
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div className="booster-card-container" ref={setNodeRef} style={style} {...attributes} {...listeners} {...rest}>
            <CardImage src={src} />
        </div>
    );
}
