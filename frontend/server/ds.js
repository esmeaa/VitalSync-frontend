// db.js
const { Pool } = require('pg');

const db = new Pool({
    host: 'cmpstudb-01.cmp.uea.ac.uk',
    user: 'tdn23mvu',
    password: 'QuiteSharpYours70%',
    database: 'tdn23mvu',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
