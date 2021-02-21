export class Player {
    constructor(id, userId, draftId, seatNumber) {
        this.id = id;
        this.userId = userId;
        this.draftId = draftId;
        this.seatNumber = seatNumber;
    }

    static createFromDb(dbPlayer) {
        return new Player(dbPlayer.id, dbPlayer.user_id, dbPlayer.draft_id, dbPlayer.seat_number);
    }

    static createManyFromDb(dbPlayers) {
        return dbPlayers.map(dbPlayer => Player.createFromDb(dbPlayer));
    }
}
