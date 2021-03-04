import pool from "./pool.js";
import { Draft } from "../models/Draft.js";

export async function create(id, userId) {
    try {
        const result = await pool.query(
            `INSERT INTO drafts(id, owner_id, status)
            VALUES ($1, $2, 0)
            RETURNING *`,
            [id, userId]
        );
        return Draft.createFromDb(result.rows[0]);
    } catch (error) {
        throw error;
    }
}

export async function find(id) {
    try {
        const result = await pool.query(
            `SELECT * FROM drafts
            WHERE id = $1`,
            [id]
        );
        if (result.rows.length) {
            return Draft.createFromDb(result.rows[0]);
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
            `SELECT drafts.id, drafts.owner_id, drafts.status, drafts.pack_number, drafts.created_at
            FROM players
                JOIN drafts ON players.draft_id = drafts.id
            WHERE user_id = $1`,
            [userId]
        );
        return Draft.createManyFromDb(result.rows);
    } catch (error) {
        throw error;
    }
}

export async function findAllOwnedByUser(userId) {
    try {
        const result = await pool.query(
            `SELECT * FROM drafts
            WHERE owner_id = $1`,
            [userId]
        );
        return Draft.createManyFromDb(result.rows);
    } catch (error) {
        throw error;
    }
}

export async function isOwnedByUser(id, userId) {
    try {
        const result = await pool.query(
            `SELECT * FROM drafts
            WHERE id = $1 AND owner_id = $2`,
            [id, userId]
        );
        return result.rows.length > 0;
    } catch (error) {
        throw error;
    }
}

export async function deleteCascade(id) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const playersResult = await client.query(
            `SELECT id
            FROM players
            WHERE players.draft_id = $1`,
            [id]
        );
        const playerIds = playersResult.rows.map((row) => row.id);

        if (playerIds.length > 0) {
            const boostersResult = await client.query(
                `SELECT id
                FROM boosters
                WHERE player_id IN (${playerIds.map((_, index) => `$${index + 1}`).join(", ")})`,
                playerIds
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
                WHERE player_id IN (${playerIds.map((_, index) => `$${index + 1}`).join(", ")})`,
                playerIds
            );

            await pool.query(
                `DELETE FROM memories
                WHERE player_id IN (${playerIds.map((_, index) => `$${index + 1}`).join(", ")})`,
                playerIds
            );

            await pool.query(
                `DELETE FROM boosters
                WHERE player_id IN (${playerIds.map((_, index) => `$${index + 1}`).join(", ")})`,
                playerIds
            );

            await pool.query(
                `DELETE FROM players
                WHERE draft_id = $1`,
                [id]
            );
        }

        await pool.query(
            `DELETE FROM drafts
            WHERE id = $1`,
            [id]
        );

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}
