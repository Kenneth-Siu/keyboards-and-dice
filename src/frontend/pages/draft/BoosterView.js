import React from "react";
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
                        <img className="card" src={card.imageName} loading="lazy" />
                    </button>
                ))}
            </div>
    );
}
