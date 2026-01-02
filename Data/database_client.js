import pg from "pg";

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

// Test de connexion
pool.on('connect', (client) => {
    client.query("SET CLIENT_ENCODING TO 'UTF8'");
});

export default pool;