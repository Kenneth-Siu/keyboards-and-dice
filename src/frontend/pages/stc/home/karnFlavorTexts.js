import { sample } from "lodash";

const flavorTexts = [
    "“Every act of destruction has a repercussion.”",
    "“An innocent man died because of my anger. That knowledge will haunt me for all eternity.”",
    "“My world is corrupted beyond cleansing. I must prevent this from happening to others.”",
    "“I am reminded of the fable of the silver egg. Its owner cracks it open to see what jewels it holds, only to discover a simple yellow yolk.”",
    "“Consider the fable of the greedy herder. As her flock grew, so did her weariness; she slept, and the sheep wandered off.”",
    "“Remember the moral of the fireslinger fable: with power comes isolation.”",
    "“Anger is fleeting; remorse is eternal.”",
    "“Remember the fable of the elf who came upon a cave of gold. In trying to free the largest piece, she was crushed by its weight.”",
    "“One cannot cleanse the wounds of failure.”",
    "“At first I simply observed. But I found that without investment in others, life serves no purpose.”",
    "“Yawgmoth is dead, and his citadels lie empty. But there will always be some who seek power at any price.”",
    "“History is a potent weapon.”",
    "“Everything the wise woman learned she wrote in a book, and when the pages were black with ink, she took white ink and began again.”",
    "“Because I am incapable of tears does not mean I have no need to shed them.”",
    "“Many have been lost to pity.”",
    "“Until you have lived as a statue, do not talk to me of pigeons.”",
];

export function getRandomKarnFlavorText() {
    return sample(flavorTexts);
}
