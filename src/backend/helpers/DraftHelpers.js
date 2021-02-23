import {
    BLACK_COLOR,
    BLUE_COLOR,
    COLORLESS_COLOR,
    COMMONS_IN_PACK,
    COMMON_RARITY,
    GREEN_COLOR,
    MYTHIC_RARITY,
    RARE_RARITY,
    RARE_TO_MYTHIC_RATIO,
    RED_COLOR,
    UNCOMMON_RARITY,
    WHITE_COLOR,
} from "../../config.js";
import cardList from "../../shared/cardList.js";
import { random, sample, sampleSize, shuffle } from "lodash";

const mythics = cardList.filter((card) => card.rarity === MYTHIC_RARITY);
const rares = cardList.filter((card) => card.rarity === RARE_RARITY);
const uncommons = cardList.filter((card) => card.rarity === UNCOMMON_RARITY);
const whiteCommons = cardList.filter((card) => card.rarity === COMMON_RARITY && card.color === WHITE_COLOR);
const blueCommons = cardList.filter((card) => card.rarity === COMMON_RARITY && card.color === BLUE_COLOR);
const blackCommons = cardList.filter((card) => card.rarity === COMMON_RARITY && card.color === BLACK_COLOR);
const redCommons = cardList.filter((card) => card.rarity === COMMON_RARITY && card.color === RED_COLOR);
const greenCommons = cardList.filter((card) => card.rarity === COMMON_RARITY && card.color === GREEN_COLOR);
const colorlessCommons = cardList.filter((card) => card.rarity === COMMON_RARITY && card.color === COLORLESS_COLOR);

export function getBooster() {
    return [getRareSlot(), ...getUncommonSlots(), ...getCommonSlots()];
}

function getRareSlot() {
    if (random(RARE_TO_MYTHIC_RATIO - 1) === 0) {
        return sample(mythics);
    }
    return sample(rares);
}

function getUncommonSlots() {
    const uncommonSlots = [];
    uncommonSlots.push(sample(uncommons));
    uncommonSlots.push(sample(uncommons.filter((card) => !isUncommonSameColorSlot(card, uncommonSlots[0]))));
    uncommonSlots.push(
        sample(
            uncommons.filter(
                (card) =>
                    !isUncommonSameColorSlot(card, uncommonSlots[0]) && !isUncommonSameColorSlot(card, uncommonSlots[1])
            )
        )
    );
    return uncommonSlots;
}

function isUncommonSameColorSlot(cardA, cardB) {
    return (
        cardA.color === cardB.color ||
        ((cardA.length > 1 || cardA.length === 0) && (cardB.length > 1 || cardB.length === 0))
    );
}

function getCommonSlots() {
    const colorFrequencies = [
        { color: WHITE_COLOR, count: 0 },
        { color: BLUE_COLOR, count: 0 },
        { color: BLACK_COLOR, count: 0 },
        { color: RED_COLOR, count: 0 },
        { color: GREEN_COLOR, count: 0 },
        { color: COLORLESS_COLOR, count: 0 },
    ];

    for (let i = 0; i < COMMONS_IN_PACK; i++) {
        const chosenIndex = random(colorFrequencies.filter((freq) => freq.count < 3).length - 1);
        let j = 0;
        colorFrequencies.forEach((freq) => {
            if (freq.count >= 3) {
                return;
            }
            if (j === chosenIndex) {
                freq.count++;
            }
            j++;
        });
    }

    const underrepresentedColors = colorFrequencies.filter((freq) => freq.count === 0);
    if (underrepresentedColors.length > 0) {
        const overrepresentedColors = colorFrequencies.includes((freq) => freq.count >= 3)
            ? colorFrequencies.filter((freq) => freq.count >= 3)
            : colorFrequencies.filter((freq) => freq.count >= 2);

        const colorsToSubtractFrom = sampleSize(overrepresentedColors, underrepresentedColors.length);

        colorsToSubtractFrom.forEach((freq) => freq.count--);
        underrepresentedColors.forEach((freq) => freq.count++);
    }

    return shuffle([
        ...sampleSize(whiteCommons, colorFrequencies[0].count),
        ...sampleSize(blueCommons, colorFrequencies[1].count),
        ...sampleSize(blackCommons, colorFrequencies[2].count),
        ...sampleSize(redCommons, colorFrequencies[3].count),
        ...sampleSize(greenCommons, colorFrequencies[4].count),
        ...sampleSize(colorlessCommons, colorFrequencies[5].count),
    ]);
}
