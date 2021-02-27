import { maxBy } from "lodash";
import { getCard } from "../../shared/cardList";

export class Bot {
    constructor(picks) {
        this.deck = picks.map((pick) => getCard(pick.cardId));
        this.colorPreferences = [
            { color: "W", weighting: 0 },
            { color: "U", weighting: 0 },
            { color: "B", weighting: 0 },
            { color: "R", weighting: 0 },
            { color: "G", weighting: 0 },
        ];

        this.deck.forEach((card, pickNumber) => {
            for (const color of card.colorIdentity) {
                this.colorPreferences[color] += (this.getBasePower(card) / 5) * (1 - 0.3 / pickNumber);
            }
        });
        this.colorBalance();
    }

    decidePick(boosterCards) {
        const cards = boosterCards.map((card) => getCard(card.cardId));

        cards.forEach((card) => {
            card.power = this.getBasePower(card);
        });

        cards.forEach((card) => {
            card.power += this.getBoostFromColorPreference(card);
        });

        console.log(cards);

        const pick = maxBy(cards, (card) => card.power);

        return boosterCards.find((card) => card.cardId === pick.id);
    }

    getBoostFromColorPreference(card) {
        const cardColors = card.colorIdentity.split("");
        const colorWeightings = cardColors.map(
            (color) => this.colorPreferences.find((pref) => pref.color === color).weighting
        );
        if (colorWeightings.length) {
            return Math.min(...colorWeightings);
        } else {
            return 0;
        }
    }

    getBasePower(card) {
        switch (card.grade) {
            case "A+":
                return 151;
            case "A":
                return 101;
            case "A-":
                return 81;
            case "B+":
                return 65;
            case "B":
                return 49;
            case "B-":
                return 39;
            case "C+":
                return 32;
            case "C":
                return 25;
            case "C-":
                return 17;
            case "D+":
                return 14;
            case "D":
                return 9;
            case "D-":
                return 4;
            case "F":
                return 0;
            default:
                console.log("Missing card grade");
                return 0;
        }
    }

    colorBalance() {
        const pickNumber = this.deck.length;

        if (this.colorPreferences.every((colorPref) => colorPref.weighting === 0)) {
            return;
        }

        if (pickNumber >= 17) {
            const firstColor = maxBy(this.colorPreferences, (colorPref) => colorPref.weighting);
            const secondColor = maxBy(
                this.colorPreferences.filter((colorPreference) => colorPreference !== firstColor),
                (colorPref) => colorPref.weighting
            );
            this.colorPreferences.forEach((colorPref) => {
                colorPref.weighting = 0;
            });
            firstColor.weighting = 152;
            secondColor.weighting = 150;
            return;
        }

        const baseBonuses = [
            0, // P1P1
            5,
            8,
            10,
            10,
            12, // P1P6
            15,
            16,
            16,
            17,
            17,
            18,
            18,
            19,
            20, // P2P1
            20,
            20,
            20,
            20,
            20,
            20,
            20,
            20,
            20,
            20,
            20,
            20,
            20,
            20, // P3P1
        ];

        const maxBonus = baseBonuses[pickNumber];
        const firstColor = maxBy(this.colorPreferences, (colorPref) => colorPref.weighting);
        const multiplier = maxBonus / firstColor.weighting;
        this.colorPreferences.forEach((colorPref) => {
            colorPref.weighting *= multiplier;
        });

        const firstColorBonuses = [
            0, // P1P1
            0,
            0,
            0,
            0,
            5, // P1P6
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            15, // P2P1
            15,
            15,
            15,
            15,
            15,
            15,
            15,
            15,
            15,
            15,
            15,
            15,
            15,
            15, // P3P1
        ];

        const firstColorBonus = firstColorBonuses[pickNumber];
        firstColor.weighting += firstColorBonus;
    }
}
