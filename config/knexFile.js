/* const knex = require('knex')({
    client: 'pg',
    connection: {
        //conString: 'postgres://lltktrdq:bz_B7nx31nAAPYN9_yGs3HGjk3N3wYRe@tuffi.db.elephantsql.com/lltktrdq',

        host: 'tuffi.db.elephantsql.com',
        port: 5432,
        user: 'lltktrdq',
        password: process.env.PASSWORD,
        database: 'proyecto-final-senpai',
        ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false // This line will fix new error
        }
    }
})
module.exports = knex
 */

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'Vperalta',
        database: 'proyecto-final-senpai',

    }
})
module.exports = knex
