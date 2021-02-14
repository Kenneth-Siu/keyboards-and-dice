import pool from "./pool.js";

export function create(userId, draftId) {
    return pool
        .query("INSERT INTO players(userId, draftId) VALUES ($1, $2) RETURNING *", [userId, draftId])
        .then((result) => {
            return result.rows[0];
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}

export function updateSeat(playerId, seatNumber) {
    return pool.query("UPDATE players SET seatNumber = $1 WHERE id = $2", [seatNumber, playerId]).catch((error) => {
        console.log(error);
        throw error;
    });
}
