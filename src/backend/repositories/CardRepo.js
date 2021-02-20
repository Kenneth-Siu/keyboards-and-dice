import { Card } from "../models/Card.js";
import pool from "./pool.js";

export function findAllForBooster(boosterId) {
    return pool
        .query("SELECT * FROM cards WHERE boosterId = $1", [boosterId])
        .then((result) => {
            return result.rows.map((row) => Card.createFromDb(row));
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}
