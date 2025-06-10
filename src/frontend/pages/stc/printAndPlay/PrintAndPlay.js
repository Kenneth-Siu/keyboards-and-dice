import React from "react";
import { COMMON_RARITY, MYTHIC_RARITY, RARE_RARITY, UNCOMMON_RARITY } from "../../../../config.js";
import cardList from "../../../../shared/cardList.js";
import CardImage from "../../../components/cardImages/CardImage.js";
import "./PrintAndPlay.scss";

export default function Rankings() {
    return (
        <>
            <title>Print and Play · Space the Convergence · Keyboards &amp; Dice</title>
            <main className="print-and-play-page">
                {[
                    ...cardList.filter((card) => card.rarity === MYTHIC_RARITY),
                    ...cardList.filter((card) => card.rarity === RARE_RARITY),
                    ...cardList.filter((card) => card.rarity === UNCOMMON_RARITY),
                    ...cardList.filter((card) => card.rarity === COMMON_RARITY),
                ].map((card) => {
                    if (card.rarity === COMMON_RARITY) {
                        return (
                            <React.Fragment key={card.cardId}>
                                <CardImage src={card.imageName} />
                                <CardImage src={card.imageName} />
                                <CardImage src={card.imageName} />
                                <CardImage src={card.imageName} />
                            </React.Fragment>
                        );
                    }
                    if (card.rarity === UNCOMMON_RARITY) {
                        return (
                            <React.Fragment key={card.cardId}>
                                <CardImage src={card.imageName} />
                                <CardImage src={card.imageName} />
                            </React.Fragment>
                        );
                    }
                    return <CardImage key={card.cardId} src={card.imageName} />;
                })}
            </main>
        </>
    );
}
