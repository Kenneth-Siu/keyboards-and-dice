export class Booster {
    constructor(id, packNumber, pickNumber, playerId) {
        this.id = id;
        this.packNumber = packNumber;
        this.pickNumber = pickNumber;
        this.playerId = playerId;
    }

    static createFromDb(dbBooster) {
        return new Booster(dbBooster.id, dbBooster.pack_number, dbBooster.pick_number, dbBooster.player_id);
    }

    static createManyFromDb(dbBoosters) {
        return dbBoosters.map(dbBooster => Booster.createFromDb(dbBooster));
    }
}
