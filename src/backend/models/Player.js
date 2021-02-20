export class Player {
    constructor(id, userId, draftId, seatNumber) {
        this.id = id;
        this.userId = userId;
        this.draftId = draftId;
        this.seatNumber = seatNumber;
    }

    static createFromDb(dbPlayer) {
        return new Player(dbPlayer.id, dbPlayer.userId, dbPlayer.draftId, dbPlayer.seatNumber);
    }
}
