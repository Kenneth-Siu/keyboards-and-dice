import { maxBy } from "lodash";
import { getCard } from "../../../shared/cardList";
import { ColorPreferences } from "./ColorPreferences";
import { CurvePreferences } from "./CurvePreferences";

export class Bot {
    constructor(picks) {
        this.deck = picks.map((pick) => getCard(pick.cardId));

        this.colorPreferences = new ColorPreferences(this.deck);
        this.curvePreferences = new CurvePreferences(this.deck);
    }

    decidePick(boosterCards) {
        const cards = boosterCards.map((card) => getCard(card.cardId));

        cards.forEach((card) => {
            const colorBoost = this.colorPreferences.getBoostToPower(card);
            const curveBoost = this.curvePreferences.getBoostToPower(card);

            card.power = card.basePower + colorBoost + curveBoost;
            // Up to 20 from synergy
        });

        const pick = maxBy(cards, (card) => card.power);

        return boosterCards.find((card) => card.cardId === pick.id);
    }
}
