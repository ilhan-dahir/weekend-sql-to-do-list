// Boilerplate for Pool & require pg dependency: 
const pg = require('pg');

// this will send Pool objects: 
const Pool = pg.Pool;

// the Pool objects are connected to DB which is 
// running at localhost:5432, named "to_do_db"
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'to_do_db'
})

pool.on('connect', () => {
    console.log('This is Pool, connected to your postgres DB!');
})

pool.on('error', (error) => {
    console.log('The Pool has an error:', error);
})

module.exports = pool;