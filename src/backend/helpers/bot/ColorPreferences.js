import { maxBy } from "lodash";

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
    }

    getBoostToPower(card) {
        const cardColors = card.colorIdentity.split("");
        const colorWeightings = cardColors.map(
            (color) => this.colorPreferences.find((pref) => pref.color === color).weighting
        );
        if (colorWeightings.length) {
            return Math.min(...colorWeightings);
        } else {
            return Math.max(...this.colorPreferences.map((pref) => pref.weighting));
        }
    }

    initColorPreferences(picks) {
        const pickNumber = picks.length;
        this.setRelativeColorPreferences(picks);
        if (this.colorPreferences.every((colorPref) => colorPref.weighting === 0)) {
            return;
        }
        if (pickNumber >= 10) {
            this.setColorPreferencesForSolidlyTwoColors();
        }
        this.scaleColorPreferencesFromRelativeToAbsolute();
        this.applyPreferenceToPrimaryColor();
    }

    setRelativeColorPreferences(picks) {
        picks.forEach((card, pickNumber) => {
            for (const color of card.colorIdentity) {
                this.colorPreferences[color] += card.basePower * (1 - 0.3 / pickNumber);
            }
        });
    }

    setColorPreferencesForSolidlyTwoColors() {
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

    scaleColorPreferencesFromRelativeToAbsolute() {
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
            20, // P1P11 (shouldn't be used)
        ];
        const maxBonus = maxBonusByPickNumber[pickNumber];
        const firstColor = maxBy(this.colorPreferences, (colorPref) => colorPref.weighting);
        const multiplier = maxBonus / firstColor.weighting;
        this.colorPreferences.forEach((colorPref) => {
            colorPref.weighting *= multiplier;
        });
    }

    applyPreferenceToPrimaryColor() {
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
            10, // P1P11 (shouldn't be used)
        ];
        const firstColorBonus = firstColorBonuses[pickNumber];
        firstColor.weighting += firstColorBonus;
    }
}
