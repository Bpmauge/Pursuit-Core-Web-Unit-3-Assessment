const pgp = require('pg-promise')();
    const connectString = 'postgres://localhost:5432/marine_research_db';
    const db = pgp(connectString);


module.exports = db;