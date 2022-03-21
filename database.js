const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'DBRestaurantesPizzarias',
    password: '0211*',
    port: 5432
});

client.connect();

module.exports = client