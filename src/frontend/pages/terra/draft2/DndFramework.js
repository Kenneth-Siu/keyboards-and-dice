import React from "react";
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import CardImage from "../../../components/cardImages/MagicCardImage";

export default function DndFramework({
    children,
    booster,
    picks,
    dndActiveCardId,
    onDragStart,
    onDragOver,
    onDragEnd,
}) {
    const dndContextProps = {
        sensors: useSensors(
            useSensor(PointerSensor),
            useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
        ),
        onDragStart,
        onDragOver,
        onDragEnd,
        modifiers: [restrictToWindowEdges],
    };

    const dragOverlayImageSrc =
        dndActiveCardId &&
        (picks.find((pick) => pick.id === dndActiveCardId)?.imageName ||
            booster?.cards.find((card) => card.id === activeId)?.imageName);

    return (
        <DndContext {...dndContextProps}>
            {children}
            <DragOverlay>{dndActiveCardId && <CardImage className="sortable" src={dragOverlayImageSrc} />}</DragOverlay>
        </DndContext>
    );
}
