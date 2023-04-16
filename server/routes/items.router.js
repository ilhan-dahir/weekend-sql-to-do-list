const express = require('express');
const itemRouter = express.Router();

//DB Connection
const pool = require('../modules/pool.js');


//GET
itemRouter.get('/', (req, res) => {
    console.log('GET /items');

    let sqlText = `
        SELECT * FROM "to_do_list"
        ORDER BY "id";`;

    pool.query(sqlText)
        .then((dbRes) => {
            let theItems = dbRes.rows;
            res.send(theItems);
        })
        .catch((dbErr) => {
            // Log that there was an issue with this function
            console.log('SQL query in GET /items failed:', dbErr);
            // Send "Internal Server Error" status to client
            res.sendStatus(500)
        })
})

//POST

//PUT

//DELETE

module.exports = itemRouter;