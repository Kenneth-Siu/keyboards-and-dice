import { maxBy } from "lodash";

export class CurvePreferences {
    constructor(picks, colorPreferences) {
        this.curvePreferences = [
            { manaValue: 2, weighting: 0 },
            { manaValue: 3, weighting: 0 },
            { manaValue: 4, weighting: 0 },
        ];
        this.colorPreferences = colorPreferences;
        this.initCurvePreferences(picks);
    }

    getBoostToPower(card) {
        if (this.isCardCurveRelevant(card)) {
            return this.curvePreferences.find((pref) => pref.manaValue === card.manaValue).weighting;
        }
        return 0;
    }

    initCurvePreferences(picks) {
        const pickNumber = picks.length;

        this.applyMinimumCurve();
        this.reckonMissingPointsOnCurve(picks);
        if (this.curvePreferences.every((pref) => pref.weighting === 0)) {
            return;
        }
        this.scaleCurvePreferences(pickNumber);
    }

    applyMinimumCurve() {
        this.curvePreferences = [
            { manaValue: 2, weighting: 5 },
            { manaValue: 3, weighting: 4 },
            { manaValue: 4, weighting: 3 },
        ];
    }

    reckonMissingPointsOnCurve(picks) {
        picks.forEach((card) => {
            if (this.isCardCurveRelevant(card)) {
                const pref = this.curvePreferences.find((pref) => pref.manaValue === card.manaValue);
                pref.weighting = Math.max(0, pref.weighting - 1);
            }
        });
    }

    scaleCurvePreferences(pickNumber) {
        const startCaringFromPickNumber = 22;

        if (pickNumber < startCaringFromPickNumber) {
            this.curvePreferences.forEach((pref) => {
                pref.weighting = 0;
            });
            return;
        }

        const caringness = [
            2, // 22, P2P9
            4,
            6,
            8,
            10,
            12,
            14, // 28, P3P1
            16,
            18,
            20, // 31, P3P4
        ];

        const maxBonus = caringness[Math.min(pickNumber - startCaringFromPickNumber, caringness.length - 1)];
        const mostImportantCurveSpot = maxBy(this.curvePreferences, (pref) => pref.weighting);
        const multiplier = maxBonus / mostImportantCurveSpot.weighting;
        this.curvePreferences.forEach((pref) => {
            pref.weighting *= multiplier;
        });
    }

    isCardCurveRelevant(card) {
        for (const color of card.colorIdentity) {
            if (!this.colorPreferences.getMainColors().includes(color)) {
                return false;
            }
        }
        return card.manaValue === 2 || card.manaValue === 3 || card.manaValue === 4;
    }
}
