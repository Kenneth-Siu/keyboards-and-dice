import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import CardImage from "../../../../components/cardImages/CardImage";
import "./PicksCard.scss";

export default function PicksCard({ id, index, src, ...rest }) {
    const { attributes, isDragging, listeners, setNodeRef, overIndex, transform, transition } = useSortable({ id: id });

    const style = {
        opacity: isDragging ? 0.5 : null,
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: (isDragging && overIndex !== -1 ? overIndex : index) * 2 + (isDragging ? 1 : 0),
    };

    return (
        <div className="picks-card-wrapper" ref={setNodeRef} style={style} {...attributes} {...listeners} {...rest}>
            <CardImage src={src} />
        </div>
    );
}
