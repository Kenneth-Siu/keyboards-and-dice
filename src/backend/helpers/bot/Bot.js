import { maxBy } from "lodash";
import { getCard } from "../../../shared/cardList";
import { ColorPreferences } from "./ColorPreferences";

export class Bot {
    constructor(picks) {
        this.deck = picks.map((pick) => getCard(pick.cardId));

        this.colorPreferences = new ColorPreferences(this.deck);
    }

    decidePick(boosterCards) {
        const cards = boosterCards.map((card) => getCard(card.cardId));

        cards.forEach((card) => {
            card.power = card.basePower;
            card.power += this.colorPreferences.getBoostToPower(card);
        });

        const pick = maxBy(cards, (card) => card.power);

        return boosterCards.find((card) => card.cardId === pick.id);
    }
}
