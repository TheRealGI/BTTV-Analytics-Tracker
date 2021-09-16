require('dotenv').config()
const knex = require('knex');

const dbConnection = knex({
    client: "sqlite3",
    connection: {
        filename: process.env['DB_FILEPATH']
    },
    useNullAsDefault: true
});

module.exports = {dbConnection};