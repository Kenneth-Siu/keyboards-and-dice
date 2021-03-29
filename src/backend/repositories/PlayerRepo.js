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

export async function findDisplayNamesForManyDrafts(draftIds) {
    try {
        const result = await pool.query(
            `SELECT players.draft_id, players.seat_number, players.user_id, users.display_name
            FROM players 
                JOIN users ON players.user_id = users.id
            WHERE players.draft_id IN (${draftIds.map((_, index) => `$${index + 1}`).join(", ")})`,
            [...draftIds]
        );
        return result.rows.map((row) => ({
            draftId: row.draft_id,
            seatNumber: row.seat_number,
            userId: row.user_id,
            displayName: row.display_name,
        }));
    } catch (error) {
        throw error;
    }
}

export async function findDisplayNamesForDraft(draftId) {
    try {
        const result = await pool.query(
            `SELECT players.draft_id, players.seat_number, players.user_id, users.display_name
            FROM players 
                JOIN users ON players.user_id = users.id
            WHERE players.draft_id = $1`,
            [draftId]
        );
        return result.rows.map((row) => ({
            draftId: row.draft_id,
            seatNumber: row.seat_number,
            userId: row.user_id,
            displayName: row.display_name,
        }));
    } catch (error) {
        throw error;
    }
}

export async function deleteCascade(playerId) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const boostersResult = await client.query(
            `SELECT id
            FROM boosters
            WHERE player_id = $1`,
            [playerId]
        );
        const boosterIds = boostersResult.rows.map((row) => row.id);

        if (boosterIds.length > 0) {
            await pool.query(
                `DELETE FROM cards
                WHERE booster_id IN (${boosterIds.map((_, index) => `$${index + 1}`).join(", ")})`,
                boosterIds
            );
        }

        await pool.query(
            `DELETE FROM picks
            WHERE player_id = $1`,
            [playerId]
        );

        await pool.query(
            `DELETE FROM memories
            WHERE player_id = $1`,
            [playerId]
        );

        await pool.query(
            `DELETE FROM boosters
            WHERE player_id = $1`,
            [playerId]
        );

        await pool.query(
            `DELETE FROM players
            WHERE id = $1`,
            [playerId]
        );

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}
