import React from "react";

import CardImage from "../../../../components/cardImages/MagicCardImage";

import "./BoosterCardsView.scss";

export default function BoosterCardsView({ booster, selectedCardId, setSelectedCardId }) {
    return (
        <div className="booster-cards-view">
            {booster.sortableCards.map((id) => (
                <div className="booster-card-container" key={id}>
                    <button
                        onClick={() => setSelectedCardId(id)}
                        className={`${selectedCardId === id ? "selected" : ""}`}
                    >
                        <CardImage src={booster.cards.find((card) => card.id === id).imageName} />
                    </button>
                </div>
            ))}
        </div>
    );
}
