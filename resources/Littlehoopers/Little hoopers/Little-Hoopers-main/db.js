const { Pool } = require('pg'); // Assuming you are using PostgreSQL
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
     ssl: {
        rejectUnauthorized: false
    },
    ssl: false
});

module.exports = pool;
