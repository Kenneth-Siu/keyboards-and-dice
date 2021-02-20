export class Card {
    constructor(id, boosterId, cardId) {
        this.id = id;
        this.boosterId = boosterId;
        this.cardId = cardId;
    }

    static createFromDb(dbPlayer) {
        return new Player(dbPlayer.id, dbPlayer.userId, dbPlayer.draftId, dbPlayer.seatNumber);
    }
}
