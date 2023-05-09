
const knex = require('knex')({
    client: 'pg',
    connection: {

        host: 'tuffi.db.elephantsql.com',
        user: 'lltktrdq',
        password: process.env.PASSWORD,
        database: 'lltktrdq',

    }
})
module.exports = knex


