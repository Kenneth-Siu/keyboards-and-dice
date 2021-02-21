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
            `SELECT drafts.id, drafts.owner_id, drafts.status, drafts.created_at
            FROM players JOIN drafts ON players.draft_id = drafts.id
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
