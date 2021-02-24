import { Card } from "../models/Card.js";
import pool from "./pool.js";

export async function findAllForBooster(boosterId) {
    try {
        const result = await pool.query(
            `SELECT * FROM cards
            WHERE booster_id = $1`,
            [boosterId]
        );
        return Card.createManyFromDb(result.rows);
    } catch (error) {
        throw error;
    }
}

export async function findCard(boosterId, cardId) {
    try {
        const result = await pool.query(
            `SELECT * FROM cards
            WHERE booster_id = $1 AND card_id = $2`,
            [boosterId, cardId]
        );
        if (result.rows.length > 0) {
            return Card.createFromDb(result.rows[0]);
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}
