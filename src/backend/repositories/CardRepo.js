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
