import { Booster } from "../models/Booster.js";
import pool from "./pool.js";

export function findAllForPlayer(playerId) {
    return pool
        .query("SELECT * FROM boosters WHERE playerId = $1", [playerId])
        .then((result) => {
            return result.rows.map((row) => Booster.createFromDb(row));
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}
