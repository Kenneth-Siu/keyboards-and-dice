export class Card {
    constructor(id, boosterId, cardId) {
        this.id = id;
        this.boosterId = boosterId;
        this.cardId = cardId;
    }

    static createFromDb(dbCard) {
        return new Card(dbCard.id, dbCard.boosterid, dbCard.cardid);
    }
}
