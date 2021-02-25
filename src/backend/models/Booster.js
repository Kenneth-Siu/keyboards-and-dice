export class Booster {
    constructor(id, pickNumber, playerId) {
        this.id = id;
        this.pickNumber = pickNumber;
        this.playerId = playerId;
    }

    static createFromDb(dbBooster) {
        return new Booster(dbBooster.id, dbBooster.pick_number, dbBooster.player_id);
    }

    static createManyFromDb(dbBoosters) {
        return dbBoosters.map(dbBooster => Booster.createFromDb(dbBooster));
    }
}
