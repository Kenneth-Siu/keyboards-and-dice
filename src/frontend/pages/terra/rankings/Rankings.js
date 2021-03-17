import React, { useEffect, useState } from "react";
import { forceCheck } from "react-lazyload";
import {
    BLACK_COLOR,
    BLUE_COLOR,
    CARD_GRADES,
    COMMON_RARITY,
    GREEN_COLOR,
    MYTHIC_RARITY,
    RARE_RARITY,
    RED_COLOR,
    UNCOMMON_RARITY,
    WHITE_COLOR,
} from "../../../../config.js";
import cardList from "../../../../shared/cardList.js";
import CardImage from "../../../components/cardImages/MagicCardImage.js";
import filterBackground from "../../../../../data/filterBackground.jpg";
import WhiteManaSymbol from "../../../../../data/whiteManaSymbol.svg";
import BlueManaSymbol from "../../../../../data/blueManaSymbol.svg";
import BlackManaSymbol from "../../../../../data/blackManaSymbol.svg";
import RedManaSymbol from "../../../../../data/redManaSymbol.svg";
import GreenManaSymbol from "../../../../../data/greenManaSymbol.svg";
import GoldManaSymbol from "../../../../../data/goldManaSymbol.svg";
import ColorlessManaSymbol from "../../../../../data/colorlessManaSymbol.svg";
import CommonSetSymbol from "../../../../../data/commonSetSymbol.svg";
import UncommonSetSymbol from "../../../../../data/uncommonSetSymbol.svg";
import RareSetSymbol from "../../../../../data/rareSetSymbol.svg";
import MythicSetSymbol from "../../../../../data/mythicSetSymbol.svg";
import cardImageGallerySplash from "../../../../../data/cardImageGallerySplash.jpg";
import "./Rankings.scss";

export default function Rankings() {
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
                if (whiteFilter && card.color.includes(WHITE_COLOR)) {
                    return true;
                }
                if (blueFilter && card.color.includes(BLUE_COLOR)) {
                    return true;
                }
                if (blackFilter && card.color.includes(BLACK_COLOR)) {
                    return true;
                }
                if (redFilter && card.color.includes(RED_COLOR)) {
                    return true;
                }
                if (greenFilter && card.color.includes(GREEN_COLOR)) {
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
                if (commonFilter && card.rarity === COMMON_RARITY) {
                    return true;
                }
                if (uncommonFilter && card.rarity === UNCOMMON_RARITY) {
                    return true;
                }
                if (rareFilter && card.rarity === RARE_RARITY) {
                    return true;
                }
                if (mythicFilter && card.rarity === MYTHIC_RARITY) {
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

    const grades = CARD_GRADES.map((grade) => ({
        grade: grade,
        cards: filterCards(cardList).filter((card) => card.grade === grade),
    }));

    return (
        <>
            <title>Rankings · Terra 2170</title>
            <main className="rankings-page">
                <div className="background-image-container">
                    <img className="background-image" src={cardImageGallerySplash} />
                </div>
                <div className="container">
                    <h1>Card Power Rankings</h1>
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
                            <button
                                onClick={() => setRedFilter((state) => !state)}
                                className={redFilter ? "selected" : ""}
                            >
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
                    <table>
                        <tbody>
                            <tr>
                                {grades.map((grade) => (
                                    <th key={grade.grade}>{grade.grade}</th>
                                ))}
                            </tr>
                            <tr>
                                {grades.map((grade) => (
                                    <td key={grade.grade} className={grade.cards.length === 0 ? "fade" : ""}>
                                        {grade.cards.length || "−"}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    {grades.map((grade) => (
                        <React.Fragment key={grade.grade}>
                            <h2>
                                {grade.grade}{" "}
                                <small>
                                    ({grade.cards.length} card{grade.cards.length !== 1 && "s"})
                                </small>
                            </h2>
                            <div className="grade-section-content">
                                {grade.cards.map((card) => (
                                    <CardImage imageName={card.imageName} key={card.id} lazy />
                                ))}
                                {grade.cards.length === 0 && <p className="no-cards">None</p>}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </main>
        </>
    );
}
