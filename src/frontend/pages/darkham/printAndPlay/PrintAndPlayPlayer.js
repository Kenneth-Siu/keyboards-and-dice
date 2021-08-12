import React from "react";
import cardList from "../../../../shared/darkhamCardList.js";
import "./PrintAndPlay.scss";

export default function DarkhamPrintAndPlayPlayer() {
    return (
        <>
            <title>Print and Play (Scenario Cards) · Darkham Horror</title>
            <main className="darkham-print-and-play-page">
                <section>
                    {getCardImages(cardList.investigators)}
                    {getCardImages(cardList.playerCards)}
                </section>
                <section className="investigator-tokens">
                    {cardList.cardImages
                        .slice(cardList.investigatorTokens.startIndex, cardList.investigatorTokens.endIndex)
                        .map((cardImage, index) => {
                            return (
                                <img
                                    key={cardList.investigatorTokens.startIndex + index}
                                    src={cardImage}
                                    className="investigator-token"
                                />
                            );
                        })}
                </section>
            </main>
        </>
    );
}

function getCardImages(group) {
    return cardList.cardImages.slice(group.startIndex, group.endIndex).map((cardImage, index) => {
        return <img key={group.startIndex + index} src={cardImage} />;
    });
}
