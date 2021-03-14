export default class Card {
    constructor(rawCard) {
        this.id = rawCard.id;
        this.name = rawCard.name;
        this.imageName = rawCard.imageName;
        this.cost = rawCard.cost;
        this.manaValue = rawCard.manaValue;
        this.color = rawCard.color;
        this.type = rawCard.type;
        this.rarity = rawCard.rarity;
        this.colorIdentity = rawCard.notes.colorIdentity;

        this.grade = rawCard.notes.grade;
        this.basePower = gradeToBasePower(this);
    }
}

function gradeToBasePower(card) {
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
            console.log(`${card.name}: Grade ${card.grade} doesn't exist`);
            return 0;
    }
}
