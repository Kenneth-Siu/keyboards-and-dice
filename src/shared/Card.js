export default class Card {
    constructor(rawCard) {
        this.id = rawCard.id;
        this.name = rawCard.name;
        this.imageName = rawCard.imageName;
        this.cost = rawCard.cost;
        this.color = rawCard.color;
        this.type = rawCard.type;
        this.rarity = rawCard.rarity;
        this.grade = rawCard.notes.grade;
        this.colorIdentity = rawCard.notes.colorIdentity;

        this.setManaValue();
    }

    setManaValue() {
        this.manaValue = 0;
        if (this.cost.length === 0) {
            return;
        }
        const splitCost = this.cost.split("");
        this.manaValue = 0;
        if (!Number.isNaN(parseInt(splitCost[0]))) {
            this.manaValue += parseInt(splitCost.shift());
        }
        this.manaValue += splitCost.length;
    }
}
