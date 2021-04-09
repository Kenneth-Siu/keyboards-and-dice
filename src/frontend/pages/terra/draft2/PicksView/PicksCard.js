import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import CardImage from "../../../../components/cardImages/MagicCardImage";
import "./PicksCard.scss";

export default function PicksCard({ id, src, ...rest }) {
    const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

    const style = {
        opacity: isDragging ? 0.5 : null,
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div className="picks-card-wrapper" ref={setNodeRef} style={style} {...attributes} {...listeners} {...rest}>
            <CardImage className="sortable" src={src} />
        </div>
    );
}
