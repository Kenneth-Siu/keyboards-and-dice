export default class Card {
    constructor(rawCard) {
        this.id = rawCard.id;
        this.name = rawCard.name;
        this.imageName = rawCard.imageName;
        this.color = rawCard.color;
        this.type = rawCard.type;
        this.rarity = rawCard.rarity;
        this.grade = rawCard.notes.grade;
        this.colorIdentity = rawCard.notes.colorIdentity;
    }
}
