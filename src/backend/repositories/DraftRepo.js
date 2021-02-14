import pool from "./pool.js";
import { Draft } from "../models/Draft.js";

export function create(id) {
    return pool
        .query("INSERT INTO drafts(id) VALUES ($1) RETURNING *", [id])
        .then((result) => {
            return Draft.createFromDb(result.rows[0]);
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}

export function findAllForUser(userId) {
    return pool
        .query(
            `SELECT drafts.id, drafts.status 
            FROM players JOIN drafts ON players.draftId = drafts.id
            WHERE userId = $1`,
            [userId]
        )
        .then((result) => {
            return result.rows.map((row) => Draft.createFromDb(row));
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}
