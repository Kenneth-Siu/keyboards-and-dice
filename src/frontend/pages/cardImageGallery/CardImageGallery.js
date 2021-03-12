import React, { useEffect, useState } from "react";
import cardList from "../../../shared/cardList.js";
import filterBackground from "../../../../data/filterBackground.jpg";
import WhiteManaSymbol from "../../../../data/whiteManaSymbol.svg";
import BlueManaSymbol from "../../../../data/blueManaSymbol.svg";
import BlackManaSymbol from "../../../../data/blackManaSymbol.svg";
import RedManaSymbol from "../../../../data/redManaSymbol.svg";
import GreenManaSymbol from "../../../../data/greenManaSymbol.svg";
import GoldManaSymbol from "../../../../data/goldManaSymbol.svg";
import ColorlessManaSymbol from "../../../../data/colorlessManaSymbol.svg";
import CommonSetSymbol from "../../../../data/commonSetSymbol.svg";
import UncommonSetSymbol from "../../../../data/uncommonSetSymbol.svg";
import RareSetSymbol from "../../../../data/rareSetSymbol.svg";
import MythicSetSymbol from "../../../../data/mythicSetSymbol.svg";
import "./CardImageGallery.scss";
import { forceCheck } from "react-lazyload";
import CardImage from "../../components/cardImage/CardImage.js";

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

    useEffect(() => {
        forceCheck();
    }, [
        whiteFilter,
        blueFilter,
        blackFilter,
        redFilter,
        greenFilter,
        goldFilter,
        colorlessFilter,
        commonFilter,
        uncommonFilter,
        mythicFilter,
    ]);

    function colorFilterCards(cards) {
        if (whiteFilter || blueFilter || blackFilter || redFilter || greenFilter || goldFilter || colorlessFilter) {
            return cards.filter((card) => {
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
            return cards.filter((card) => {
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
                        <CardImage imageName={card.imageName} key={card.id} lazy />
                    ))}
                </div>
                <div className="filter-pane">
                    <img className="background-image" src={filterBackground} />
                    <div className="color-filters">
                        <button
                            onClick={() => setWhiteFilter((state) => !state)}
                            className={whiteFilter ? "selected" : ""}
                        >
                            <WhiteManaSymbol />
                        </button>
                        <button
                            onClick={() => setBlueFilter((state) => !state)}
                            className={blueFilter ? "selected" : ""}
                        >
                            <BlueManaSymbol />
                        </button>
                        <button
                            onClick={() => setBlackFilter((state) => !state)}
                            className={blackFilter ? "selected" : ""}
                        >
                            <BlackManaSymbol />
                        </button>
                        <button onClick={() => setRedFilter((state) => !state)} className={redFilter ? "selected" : ""}>
                            <RedManaSymbol />
                        </button>
                        <button
                            onClick={() => setGreenFilter((state) => !state)}
                            className={greenFilter ? "selected" : ""}
                        >
                            <GreenManaSymbol />
                        </button>
                        <button
                            onClick={() => setGoldFilter((state) => !state)}
                            className={goldFilter ? "selected" : ""}
                        >
                            <GoldManaSymbol />
                        </button>
                        <button
                            onClick={() => setColorlessFilter(!colorlessFilter)}
                            className={colorlessFilter ? "selected" : ""}
                        >
                            <ColorlessManaSymbol />
                        </button>
                    </div>
                    <div className="rarity-filters">
                        <button
                            onClick={() => setCommonFilter((state) => !state)}
                            className={commonFilter ? "selected" : ""}
                        >
                            <CommonSetSymbol />
                        </button>
                        <button
                            onClick={() => setUncommonFilter((state) => !state)}
                            className={uncommonFilter ? "selected" : ""}
                        >
                            <UncommonSetSymbol />
                        </button>
                        <button
                            onClick={() => setRareFilter((state) => !state)}
                            className={rareFilter ? "selected" : ""}
                        >
                            <RareSetSymbol />
                        </button>
                        <button
                            onClick={() => setMythicFilter((state) => !state)}
                            className={mythicFilter ? "selected" : ""}
                        >
                            <MythicSetSymbol />
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
