import { User } from "../models/User.js";
import pool from "./pool.js";

export async function findOrCreate(user) {
    try {
        const result = await pool.query(
            `SELECT * FROM users
            WHERE id = $1`,
            [user.id]
        );
        if (result.rows.length > 0) {
            return User.createFromDb(result.rows[0]);
        }
        const insertResult = await pool.query(
            `INSERT INTO users(id, display_name)
            VALUES ($1, $2)
            RETURNING *`,
            [user.id, user.displayName]
        );
        return User.createFromDb(insertResult.rows[0]);
    } catch (error) {
        throw error;
    }
}

export async function getUser(id) {
    try {
        const result = await pool.query(
            `SELECT * FROM users 
            WHERE id = $1`,
            [id]
        );
        return User.createFromDb(result.rows[0]);
    } catch (error) {
        throw error;
    }
}
