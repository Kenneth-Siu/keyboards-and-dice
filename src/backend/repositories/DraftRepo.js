import pool from "./pool.js";
import { Draft } from "../models/Draft.js";

export function create(id, userId) {
    return pool
        .query("INSERT INTO drafts(id, ownerId, status) VALUES ($1, $2, 0) RETURNING *", [id, userId])
        .then((result) => {
            return Draft.createFromDb(result.rows[0]);
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}

export function find(id) {
    return pool
        .query("SELECT * FROM drafts WHERE id = $1", [id])
        .then((result) => {
            if (result.rows.length) {
                return Draft.createFromDb(result.rows[0]);
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}

export function findAllForUser(userId) {
    return pool
        .query(
            `SELECT drafts.id, drafts.ownerId, drafts.status 
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

export function findAllOwnedByUser(userId) {
    return pool
        .query(`SELECT * FROM drafts WHERE ownerId = $1`, [userId])
        .then((result) => {
            return result.rows.map((row) => Draft.createFromDb(row));
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}
