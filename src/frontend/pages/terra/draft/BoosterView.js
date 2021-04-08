import React from "react";
import CardImage from "../../../components/cardImages/MagicCardImage";
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
                    <CardImage src={card.imageName} lazy />
                </button>
            ))}
        </div>
    );
}
