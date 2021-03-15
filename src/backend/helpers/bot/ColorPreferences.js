import { maxBy, sum } from "lodash";

export class ColorPreferences {
    constructor(picks) {
        this.colorPreferences = [
            { color: "W", weighting: 0 },
            { color: "U", weighting: 0 },
            { color: "B", weighting: 0 },
            { color: "R", weighting: 0 },
            { color: "G", weighting: 0 },
        ];
        this.initColorPreferences(picks);
        console.log(this.colorPreferences);
    }

    getBoostToPower(card) {
        const cardColors = card.colorIdentity.split("");
        const colorWeightings = cardColors.map(
            (color) => this.colorPreferences.find((pref) => pref.color === color).weighting
        );
        if (colorWeightings.length === 1) {
            return Math.min(...colorWeightings);
        } else if (colorWeightings.length > 1) {
            return sum(colorWeightings) - maxBy(this.colorPreferences, (colorPref) => colorPref.weighting).weighting;
        } else {
            return Math.max(...this.colorPreferences.map((pref) => pref.weighting));
        }
    }

    getMainColors() {
        const firstColor = maxBy(this.colorPreferences, (colorPref) => colorPref.weighting);
        const secondColor = maxBy(
            this.colorPreferences.filter((colorPreference) => colorPreference !== firstColor),
            (colorPref) => colorPref.weighting
        );
        return [firstColor.color, secondColor.color];
    }

    initColorPreferences(picks) {
        const pickNumber = picks.length;
        this.setRelativeColorPreferences(picks);
        if (this.colorPreferences.every((colorPref) => colorPref.weighting === 0)) {
            return;
        }
        if (pickNumber >= 18) {
            this.setColorPreferencesForSolidlyTwoColors();
            return;
        }
        this.scaleColorPreferencesFromRelativeToAbsolute(pickNumber);
        this.applyPreferenceToPrimaryColor(pickNumber);
    }

    setRelativeColorPreferences(picks) {
        picks.forEach((card, pickNumber) => {
            for (const color of card.colorIdentity) {
                this.colorPreferences.find((pref) => pref.color === color).weighting +=
                    card.basePower * (1 - 0.6 / (pickNumber + 2));
            }
        });
    }

    setColorPreferencesForSolidlyTwoColors() {
        const [firstColor, secondColor] = this.getMainColors();
        this.colorPreferences.forEach((colorPref) => {
            colorPref.weighting = 0;
        });
        this.colorPreferences.find((pref) => pref.color === firstColor).weighting = 152;
        this.colorPreferences.find((pref) => pref.color === secondColor).weighting = 150;
    }

    scaleColorPreferencesFromRelativeToAbsolute(pickNumber) {
        const maxBonusByPickNumber = [
            0, // P1P1
            2,
            4,
            6,
            8,
            10, // P1P6
            12,
            14,
            16,
            18,
            20, // P1P11
            20,
            20,
            20,
            20, // P2P1
            20,
            20,
            20,
            20, // P2P5 (shouldn't be used)
        ];
        const maxBonus = maxBonusByPickNumber[pickNumber];
        const firstColor = maxBy(this.colorPreferences, (colorPref) => colorPref.weighting);
        const multiplier = maxBonus / firstColor.weighting;
        this.colorPreferences.forEach((colorPref) => {
            colorPref.weighting *= multiplier;
        });
    }

    applyPreferenceToPrimaryColor(pickNumber) {
        const firstColorBonuses = [
            0, // P1P1
            0,
            0,
            0,
            0,
            1, // P1P6
            2,
            3,
            4,
            5,
            5, // P1P11
            5,
            5,
            5,
            5, // P2P1
            5,
            5,
            5,
            5, // P2P5 (shouldn't be used)
        ];
        const firstColorBonus = firstColorBonuses[pickNumber];
        const firstColor = maxBy(this.colorPreferences, (colorPref) => colorPref.weighting);
        firstColor.weighting += firstColorBonus;
    }
}
