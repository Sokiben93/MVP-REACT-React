const { Pool } = require("pg");

const pool = new Pool({
  // Format: postgres://user:password@host:5432/database
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === "production"
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
});

module.exports = pool;