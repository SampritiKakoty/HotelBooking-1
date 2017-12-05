const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/HotelDB', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/Hotel', (req, res) => {
    console.log('Inside router');
    connection((db) => {
        db.collection('Hotel')
            .find()
            .toArray()
            .then((Hotel) => {
                response.data = Hotel;
                console.log(Hotel);
                res.send(Hotel);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;