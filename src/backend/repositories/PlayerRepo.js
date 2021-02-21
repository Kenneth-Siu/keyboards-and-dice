import { Player } from "../models/Player.js";
import pool from "./pool.js";

export async function create(userId, draftId) {
    try {
        const result = await pool.query(
            `INSERT INTO players(user_id, draft_id)
            VALUES ($1, $2) RETURNING *`,
            [userId, draftId]
        );
        return Player.createFromDb(result.rows[0]);
    } catch (error) {
        throw error;
    }
}

export async function createManyForDraft(userIds, draftId) {
    try {
        const result = await pool.query(
            `INSERT INTO players (user_id, draft_id)
            VALUES ${userIds.map((_, index) => `($${index + 2}, $1)`).join(", ")}
            RETURNING *;`,
            [draftId, ...userIds]
        );
        return Player.createManyFromDb(result.rows);
    } catch (error) {
        throw error;
    }
}

export async function find(userId, draftId) {
    try {
        const result = await pool.query(
            `SELECT * FROM players
            WHERE user_id = $1 AND draft_id = $2`,
            [userId, draftId]
        );
        if (result.rows.length) {
            return Player.createFromDb(result.rows[0]);
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

export async function findAllForUser(userId) {
    try {
        const result = await pool.query(
            `SELECT * FROM players
            WHERE user_id = $1`,
            [userId]
        );
        return Player.createManyFromDb(result.rows);
    } catch (error) {
        throw error;
    }
}
