export default class Card {
    constructor(rawCard) {
        this.id = rawCard.id;
        this.name = rawCard.name;
        this.imageName = rawCard.imageName;
        this.color = rawCard.color;
        this.rarity = rawCard.rarity;
    }
}
