import { maxBy } from "lodash";
import { getCard } from "../../shared/cardList";

export class Bot {
    constructor(picks) {
        this.deck = picks.map((pick) => getCard(pick.cardId));
    }

    decidePick(boosterCards) {
        const cards = boosterCards.map((card) => getCard(card.cardId));
        const pick = maxBy(cards, gradeToPower);
        return boosterCards.find((card) => card.cardId === pick.id);
    }
}

function gradeToPower(card) {
    switch (card.grade) {
        case "A+":
            return 130;
        case "A":
            return 100;
        case "A-":
            return 80;
        case "B+":
            return 65;
        case "B":
            return 50;
        case "B-":
            return 40;
        case "C+":
            return 32;
        case "C":
            return 25;
        case "C-":
            return 18;
        case "D+":
            return 14;
        case "D":
            return 10;
        case "D-":
            return 5;
        case "F":
            return 0;

        default:
            break;
    }
}
