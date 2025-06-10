import React from "react";
import { useLocation } from "react-router-dom";
import cardList from "../../../../shared/darkhamCardList.js";
import "./PrintAndPlay.scss";

export default function DarkhamPrintAndPlayScenario() {
    const numberOfPlayers = new URLSearchParams(useLocation().search).get("players") || 4;
    return (
        <>
            <title>Print and Play (Scenario Cards) · Darkham Horror · Keyboards &amp; Dice</title>
            <main className="darkham-print-and-play-page">
                <section>
                    <h1>Encounter sets</h1>
                    <h2>Encounter card back</h2>
                    {getCardImages(cardList.agentsOfTheAncestor)}
                    {getCardImages(cardList.deepTreasures)}
                    {getCardImages(cardList.godsConverge)}
                    {getCardImages(cardList.hallsOfPower)}
                    {getCardImages(cardList.longJourney)}
                    {getCardImages(cardList.settingSun)}
                    {getCardImages(cardList.theDark)}
                </section>
                <section>
                    <h2>Double-sided</h2>
                    {getCardImages(cardList.theDarkShadows)}
                </section>
                <section>
                    <h2>Player card back</h2>
                    {getDungeonSuppliesImages(numberOfPlayers || 4)}
                </section>
                <section>
                    <h1>Scenario 1 - Beneath the Manor</h1>
                    <h2>Double-sided</h2>
                    {getCardImages(cardList.beneathTheManorDouble)}
                </section>
                <section>
                    <h2>Encounter card back</h2>
                    {getCardImages(cardList.beneathTheManorEncounter)}
                </section>
                <section>
                    <h1>Scenario 2 - The Study of Life</h1>
                    <h2>Double-sided</h2>
                    {getCardImages(cardList.theStudyOfLifeDouble)}
                </section>
                <section>
                    <h2>Encounter card back</h2>
                    {getCardImages(cardList.theStudyOfLifeEncounter)}
                </section>
                <section>
                    <h2>Player card back</h2>
                    {getCardImages(cardList.theStudyOfLifePlayer)}
                </section>
                <section>
                    <h1>Scenario 3 - Blind Leading the Blind</h1>
                    <h2>Double-sided</h2>
                    {getCardImages(cardList.blindLeadingTheBlindDouble)}
                </section>
                <section>
                    <h2>Encounter card back</h2>
                    {getCardImages(cardList.blindLeadingTheBlindEncounter)}
                </section>
                <section>
                    <h1>Scenario 4 - Wolves at the Door</h1>
                    <h2>Double-sided</h2>
                    {getCardImages(cardList.wolvesAtTheDoorDouble)}
                </section>
                <section>
                    <h2>Encounter card back</h2>
                    {getCardImages(cardList.wolvesAtTheDoorEncounter)}
                </section>
                <section>
                    <h2>Player card back</h2>
                    {getCardImages(cardList.wolvesAtTheDoorPlayer)}
                </section>
                <section>
                    <h1>Scenario 5 - Lost in the Woods</h1>
                    <h2>Double-sided</h2>
                    {getCardImages(cardList.lostInTheWoodsDouble)}
                </section>
                <section>
                    <h2>Encounter card back</h2>
                    {getCardImages(cardList.lostInTheWoodsEncounter)}
                </section>
                <section>
                    <h2>Player card back</h2>
                    {getCardImages(cardList.lostInTheWoodsPlayer)}
                </section>
                <section>
                    <h1>Scenario 6 - Summoning Courage</h1>
                    <h2>Double-sided</h2>
                    {getCardImages(cardList.summoningCourageDouble)}
                </section>
                <section>
                    <h2>Encounter card back</h2>
                    {getCardImages(cardList.summoningCourageEncounter)}
                </section>
                <section>
                    <h2>Player card back</h2>
                    {getCardImages(cardList.summoningCouragePlayer)}
                </section>
                <section>
                    <h1>Scenario 7 - Rising Tides</h1>
                    <h2>Double-sided</h2>
                    {getCardImages(cardList.risingTidesDouble)}
                </section>
                <section>
                    <h2>Encounter card back</h2>
                    {getCardImages(cardList.risingTidesEncounter)}
                </section>
                <section>
                    <h2>Player card back</h2>
                    {getCardImages(cardList.risingTidesPlayer)}
                </section>
                <section>
                    <h1>Scenario 8 - Heart of Darkness</h1>
                    <h2>Double-sided</h2>
                    {getCardImages(cardList.heartOfDarknessDouble)}
                </section>
                <section>
                    <h2>Encounter card back</h2>
                    {getCardImages(cardList.heartOfDarknessEncounter)}
                </section>
                <section>
                    <h2>Player card back</h2>
                    {getCardImages(cardList.heartOfDarknessPlayer)}
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

function getDungeonSuppliesImages(numberOfPlayers) {
    // This is awful but I cba to make it better
    return cardList.cardImages
        .slice(cardList.dungeonSupplies.startIndex, cardList.dungeonSupplies.endIndex)
        .map((cardImage, index) => {
            switch (index) {
                // Aegis Scale
                case 0:
                // Holy Water
                case 3:
                    return <img key={index} src={cardImage} />;
                // Torch
                case 6:
                    return (
                        <React.Fragment key={index}>
                            <img src={cardImage} />
                            <img src={cardImage} />
                        </React.Fragment>
                    );
                // Food
                case 2:
                    return (
                        <React.Fragment key={index}>
                            {new Array(numberOfPlayers * 1).fill(<img src={cardImage} />)}
                        </React.Fragment>
                    );
                // Bandage
                case 1:
                // Laudanum
                case 4:
                // Medicinal Herbs
                case 5:
                    return (
                        <React.Fragment key={index}>
                            {new Array(numberOfPlayers * 2).fill(<img src={cardImage} />)}
                        </React.Fragment>
                    );
            }
            return <img key={index} src={cardImage} />;
        });
}
