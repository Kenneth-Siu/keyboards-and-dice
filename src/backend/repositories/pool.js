const { Pool } = require("pg");

const poolConfig = {
    connectionString: process.env.DATABASE_URL,
};

if (process.env.USE_SSL !== "false") {
    poolConfig.ssl = {
        rejectUnauthorized: false,
    };
}

const pool = new Pool(poolConfig);

export default pool;
