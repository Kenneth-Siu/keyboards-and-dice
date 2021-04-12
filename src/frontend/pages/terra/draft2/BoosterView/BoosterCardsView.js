import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import { boosterContainerId } from "../DraftHelpers";
import BoosterCard from "./BoosterCard";

import "./BoosterCardsView.scss";

export default function BoosterCardsView({ booster, selectedCardId }) {
    const { setNodeRef } = useDroppable({ id: boosterContainerId });

    return (
        <SortableContext key={boosterContainerId} items={booster.sortableCards} strategy={rectSortingStrategy}>
            <div className="booster-cards-view" ref={setNodeRef}>
                {booster.sortableCards.map((id) => (
                    <BoosterCard
                        id={id}
                        key={id}
                        selected={selectedCardId === id}
                        src={booster.cards.find((card) => card.id === id).imageName}
                    />
                ))}
            </div>
        </SortableContext>
    );
}
