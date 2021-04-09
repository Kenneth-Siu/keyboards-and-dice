import React from "react";

import CardImage from "../../../../components/cardImages/MagicCardImage";

import "./BoosterCardsView.scss";

export default function BoosterCardsView({ booster, sortableBooster, selectedCardId, setSelectedCardId }) {
    return (
        <div className="booster-cards-view">
            {sortableBooster.map((id) => (
                <button
                    onClick={() => setSelectedCardId(id)}
                    key={id}
                    className={`${selectedCardId === id ? "selected" : ""}`}
                >
                    <CardImage src={booster.cards.find((card) => card.id === id).imageName} />
                </button>
            ))}
        </div>
    );
}
