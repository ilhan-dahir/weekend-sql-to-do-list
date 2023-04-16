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
itemRouter.post('/', (req, res) => {
    console.log('POST /items');
    let newTask = req.body;
    let sqlText = `INSERT INTO "to_do_list" ("item","completed")
                    VALUES($1, $2);`;
    let sqlValue = [newTask.item, newTask.completed];
    pool.query(sqlText, sqlValue)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`Error adding new task`, error);
            res.sendStatus(500);
        })
})

//PUT

//DELETE

module.exports = itemRouter;