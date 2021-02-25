export class Pick {
    constructor(id, playerId, cardId) {
        this.id = id;
        this.playerId = playerId;
        this.cardId = cardId;
    }

    static createFromDb(dbPick) {
        return new Pick(dbPick.id, dbPick.player_id, dbPick.card_id);
    }

    static createManyFromDb(dbPicks) {
        return dbPicks.map((dbPick) => Pick.createFromDb(dbPick));
    }
}
