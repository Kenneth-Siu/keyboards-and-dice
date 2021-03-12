import React from "react";
import CardImage from "../../components/cardImage/CardImage";
import "./BoosterView.scss";

export function BoosterView({ cards, selectedCardIndex, setSelectedCardIndex }) {
    return (
        <div className="booster">
            {cards.map((card, index) => (
                <button
                    onClick={() => setSelectedCardIndex(index)}
                    key={index}
                    className={`${selectedCardIndex === index ? "selected" : ""}`}
                >
                    <CardImage imageName={card.imageName} lazy />
                </button>
            ))}
        </div>
    );
}
