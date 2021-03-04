import React, { useState } from "react";
import { PillButton } from "../../components/pillButton/PillButton.js";
import "./BoosterView.scss";

export function BoosterView({cards, submitPick}) {

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    return (
        <>
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
            <PillButton onClick={onClick} className="submit-pick" disabled={selectedCardIndex === null}>
                Submit Pick
            </PillButton>
        </>
    );

    function onClick() {
        submitPick(selectedCardIndex);
        setSelectedCardIndex(null);
    }
}
