import pool from "./pool.js";

export function findOrCreate(user) {
    return pool
        .query("SELECT * FROM users WHERE id = $1", [user.id])
        .then((result) => {
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return pool
                    .query("INSERT INTO users(id, displayName) VALUES ($1, $2) RETURNING *", [
                        user.id,
                        user.displayName,
                    ])
                    .then((result) => {
                        return result.rows[0];
                    });
            }
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}

export function getUser(id) {
    return pool
        .query("SELECT * FROM users WHERE id = $1", [id])
        .then((result) => {
            return result.rows[0];
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}
