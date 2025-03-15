const express = require('express');
const { client } = require('./db');
const router = express.Router();

router.get('/data', async (req, res) => {
    const db = client.db('venuemanagement');
    const collection = db.collection('data');
    const documents = await collection.find({}).toArray();
    res.json(documents);
});

router.post('/data', async (req, res) => {
    const db = client.db('venuemanagement');
    const collection = db.collection('data');
    const result = await collection.insertOne(req.body);
    res.json(result);
});

module.exports = router;
