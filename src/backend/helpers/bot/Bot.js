import { maxBy, sortBy } from "lodash";
import { getCard } from "../../../shared/cardList";
import { ColorPreferences } from "./ColorPreferences";
import { CurvePreferences } from "./CurvePreferences";

export class Bot {
    constructor(picks, logging) {
        this.deck = picks.map((pick) => getCard(pick.cardId));
        this.logging = logging || false;

        this.colorPreferences = new ColorPreferences(this.deck);
        this.curvePreferences = new CurvePreferences(this.deck, this.colorPreferences);
    }

    decidePick(boosterCards) {
        const cards = boosterCards.map((card) => getCard(card.cardId));

        cards.forEach((card) => {
            const colorBoost = this.colorPreferences.getBoostToPower(card);
            const curveBoost = this.curvePreferences.getBoostToPower(card);

            card.power = card.basePower + colorBoost + curveBoost;

            // Up to 20 from synergy
        });

        if (this.logging) {
            console.log(`                        Name : Power =    Base    +  Color     +  CMC`)
            sortBy(cards, (card) => -card.power).forEach((card) => {
                const name = card.name.padStart(28);
                const power = `${card.power.toFixed(1)}`.padStart(5);
                const basePower = `${card.basePower.toFixed(1).padStart(5)} ${`(${card.grade})`.padEnd(4)}`;
                const colorBoost = `${this.colorPreferences.getBoostToPower(card).toFixed(1).padStart(5)} ${`(${card.colorIdentity})`.padEnd(4)}`;
                const curveBoost = `${this.curvePreferences.getBoostToPower(card).toFixed(1).padStart(4)} (${card.manaValue})`;
                console.log(
                    `${name} : ${power} = ${basePower} + ${colorBoost} + ${curveBoost}`
                );
            });
        }

        const pick = maxBy(cards, (card) => card.power);

        return boosterCards.find((card) => card.cardId === pick.id);
    }
}
