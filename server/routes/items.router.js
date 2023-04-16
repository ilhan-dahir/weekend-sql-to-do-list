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
itemRouter.put('/:id', (req, res) => {
    let idToUpdate = req.params.id;
    let isChecked = req.body.completed;

    let sqlText = `
    UPDATE "to_do_list"
        SET "completed"=$1
        WHERE "id"=$2;
    `
    let sqlValues = [isChecked, idToUpdate];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('PUT /itemRouter', dbErr);
            res.sendStatus(500);
        })

}

)

//DELETE
itemRouter.delete('/:id', (req, res) => {
    console.log(req.params);

    let theIdToDelete = req.params.id;

    // Set up to sanitize the input when paired with
    //  sqlValues.
    let sqlText = `
        DELETE from "to_do_list"
            where "id"=$1;
    `;

    // Pair with sqlText to sanitize input.
    let sqlValues = [theIdToDelete];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            // Send "Okay" to the client that declares this
            //  delete was accepted/processed
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            // Log that there was an issue with this function
            console.log('delete /items/:id error:', dbErr);
            // Send "Internal Server Error" status to client
            res.sendStatus(500);
        })

})

module.exports = itemRouter;