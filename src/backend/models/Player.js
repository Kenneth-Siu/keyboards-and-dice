export class Player {
    constructor(userId, draftId, seatNumber) {
        this.userId = userId;
        this.draftId = draftId;
        this.seatNumber = seatNumber;
    }

    static createFromDb(dbPlayer) {
        return new Draft(dbPlayer.userId, dbPlayer.draftId, dbPlayer.seatNumber);
    }
}
