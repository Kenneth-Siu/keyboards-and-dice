export class Booster {
    constructor(id, packNumber, pickNumber, playerId) {
        this.id = id;
        this.packNumber = packNumber;
        this.pickNumber = pickNumber;
        this.playerId = playerId;
    }

    static createFromDb(dbBooster) {
        return new Booster(dbBooster.id, dbBooster.packnumber, dbBooster.picknumber, dbBooster.playerid);
    }
}
