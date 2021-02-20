import React, { useState } from "react";
import cardList from "../../models/cardList.js";
import filterBackground from "../../../../data/filterBackground.jpg";
import whiteManaSymbol from "../../../../data/whiteManaSymbol.svg";
import blueManaSymbol from "../../../../data/blueManaSymbol.svg";
import blackManaSymbol from "../../../../data/blackManaSymbol.svg";
import redManaSymbol from "../../../../data/redManaSymbol.svg";
import greenManaSymbol from "../../../../data/greenManaSymbol.svg";
import goldManaSymbol from "../../../../data/goldManaSymbol.svg";
import colorlessManaSymbol from "../../../../data/colorlessManaSymbol.svg";
import commonSetSymbol from "../../../../data/commonSetSymbol.svg";
import uncommonSetSymbol from "../../../../data/uncommonSetSymbol.svg";
import rareSetSymbol from "../../../../data/rareSetSymbol.svg";
import mythicSetSymbol from "../../../../data/mythicSetSymbol.svg";
import "./CardImageGallery.scss";

export default function CardImageGallery() {
    const [whiteFilter, setWhiteFilter] = useState(false);
    const [blueFilter, setBlueFilter] = useState(false);
    const [blackFilter, setBlackFilter] = useState(false);
    const [redFilter, setRedFilter] = useState(false);
    const [greenFilter, setGreenFilter] = useState(false);
    const [goldFilter, setGoldFilter] = useState(false);
    const [colorlessFilter, setColorlessFilter] = useState(false);

    const [commonFilter, setCommonFilter] = useState(false);
    const [uncommonFilter, setUncommonFilter] = useState(false);
    const [rareFilter, setRareFilter] = useState(false);
    const [mythicFilter, setMythicFilter] = useState(false);

    function colorFilterCards(cards) {
        if (whiteFilter || blueFilter || blackFilter || redFilter || greenFilter || goldFilter || colorlessFilter) {
            return cards.filter(card => {
                if (whiteFilter && card.color.includes("W")) {
                    return true;
                }
                if (blueFilter && card.color.includes("U")) {
                    return true;
                }
                if (blackFilter && card.color.includes("B")) {
                    return true;
                }
                if (redFilter && card.color.includes("R")) {
                    return true;
                }
                if (greenFilter && card.color.includes("G")) {
                    return true;
                }
                if (goldFilter && card.color.length > 1) {
                    return true;
                }
                if (colorlessFilter && card.color.length === 0) {
                    return true;
                }
                return false;
            });
        }
        return cards;
    }

    function rarityFilterCards(cards) {
        if (commonFilter || uncommonFilter || rareFilter || mythicFilter) {
            return cards.filter(card => {
                if (commonFilter && card.rarity === "C") {
                    return true;
                }
                if (uncommonFilter && card.rarity === "U") {
                    return true;
                }
                if (rareFilter && card.rarity === "R") {
                    return true;
                }
                if (mythicFilter && card.rarity === "M") {
                    return true;
                }
                return false;
            });
        }
        return cards;
    }

    function filterCards(cards) {
        return rarityFilterCards(colorFilterCards(cards));
    }

    return (
        <>
            <title>Card Image Gallery · Terra 2170</title>
            <main className="card-image-gallery-page">
                <h1>Card Image Gallery</h1>
                <p className="num-of-cards">{cardList.length} cards</p>
                <div className="card-grid">
                    {filterCards(cardList).map((card) => (
                        <img className="card" src={card.imageName} key={card.id} loading="lazy" />
                    ))}
                </div>
                <div className="filter-pane">
                    <img className="background-image" src={filterBackground} />
                    <div className="color-filters">
                        <button onClick={() => setWhiteFilter(state => !state)} className={whiteFilter ? "selected" : ""}>
                            <img src={whiteManaSymbol} />
                        </button>
                        <button onClick={() => setBlueFilter(state => !state)} className={blueFilter ? "selected" : ""}>
                            <img src={blueManaSymbol} />
                        </button>
                        <button onClick={() => setBlackFilter(state => !state)} className={blackFilter ? "selected" : ""}>
                            <img src={blackManaSymbol} />
                        </button>
                        <button onClick={() => setRedFilter(state => !state)} className={redFilter ? "selected" : ""}>
                            <img src={redManaSymbol} />
                        </button>
                        <button onClick={() => setGreenFilter(state => !state)} className={greenFilter ? "selected" : ""}>
                            <img src={greenManaSymbol} />
                        </button>
                        <button onClick={() => setGoldFilter(state => !state)} className={goldFilter ? "selected" : ""}>
                            <img src={goldManaSymbol} />
                        </button>
                        <button
                            onClick={() => setColorlessFilter(!colorlessFilter)}
                            className={colorlessFilter ? "selected" : ""}
                        >
                            <img src={colorlessManaSymbol} />
                        </button>
                    </div>
                    <div className="rarity-filters">
                        <button onClick={() => setCommonFilter(state => !state)} className={commonFilter ? "selected" : ""}>
                            <img src={commonSetSymbol} />
                        </button>
                        <button onClick={() => setUncommonFilter(state => !state)} className={uncommonFilter ? "selected" : ""}>
                            <img src={uncommonSetSymbol} />
                        </button>
                        <button onClick={() => setRareFilter(state => !state)} className={rareFilter ? "selected" : ""}>
                            <img src={rareSetSymbol} />
                        </button>
                        <button onClick={() => setMythicFilter(state => !state)} className={mythicFilter ? "selected" : ""}>
                            <img src={mythicSetSymbol} />
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
