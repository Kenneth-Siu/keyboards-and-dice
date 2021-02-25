import { Pick } from "../models/Pick.js";
import pool from "./pool.js";

export async function findAllForPlayer(playerId) {
    try {
        const result = await pool.query(
            `SELECT * FROM picks
            WHERE player_id = $1`,
            [playerId]
        );
        return Pick.createManyFromDb(result.rows);
    } catch (error) {
        throw error;
    }
}
