const { Client } = require('pg');

const client = new Client({
    user: 'xjmgnjsxxvmind',
    host: 'ec2-34-236-87-247.compute-1.amazonaws.com',
    database: 'df52t4ke2v04kt',
    password: '63f79f22a9456c62347ca68b8c2ec8f7ffe87eec4433bb570506ddd261f98aae',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

client.connect();

module.exports = client