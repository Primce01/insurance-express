const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const cors = require('cors')

const make = require('./make');
const model = require('./model')
const vehicle = require('./vehicle')

app.use(cors())

const url = 'mongodb+srv://kelvin:sotco2000@cluster0.adtt0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let db = null;
// Database Name
const dbName = 'b_4';
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Use connect method to connect to the server
client.connect(function (err) {
    assert.equal(null, err);
    console.log('Connected successfully to server');
    db = client.db(dbName);
    // client.close();
});

app.get('/', (request, response) => {
    response.send('Changed Hello World!')
})

app.get('/about', (req, res) => {
    res.send('This is my about page!')
})

app.get('/api/makes', async (req, res) => {
    const data = await make.find(req.query)
    res.json(data);
})

app.get('/api/makes/:id', async (req, res) => {
    const data = await make.findOne({ id: req.params.id })
    res.json(data)
})

app.get('/api/models', async (req, res) => {
    const data = await model.find(req.query)
    res.json(data)
})

app.get('/api/models/:id', async (req, res) => {
    const data = await model.findOne({ id: req.params.id })
    const vehicles = await vehicle.find({ model_id: req.params.id })
    const sum = vehicles.reduce((acc, current) => {
        return acc + current.specs.Weight
    }, 0)
    const average_weight = vehicles.length ? sum / vehicles.length : 0
    res.json({ ...data, average_weight })
})

app.get('/api/vehicles', async (req, res) => {
    const data = await vehicle.find(req.query)
    res.json(data)
})

app.get('/api/vehicles/:id', async (req, res) => {
    const data = await vehicle.findOne({ id: req.params.id })
    res.json(data)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const findMakeModels = function (db, make_id, callback) {
    // Get the documents collection
    const collection = db.collection('b_models');
    // Find some documents
    collection.find({ make_id }).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
};

findModelVehicles = function (db, model_id, callback) {
    // Get the documents collection
    const collection = db.collection('b_vehicles');
    // Find some documents
    collection.find({ model_id }).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
};