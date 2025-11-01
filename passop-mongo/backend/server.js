const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, ObjectId } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config()

// Connecting to the MongoDB Client
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
client.connect();

// App & Database
const dbName = process.env.DB_NAME
const app = express()
const port = 3000

// Middleware
app.use(bodyparser.json())
app.use(cors())

// Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Save a password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const insertResult = await collection.insertOne(password);
    res.send({ success: true, result: insertResult })
})

// Edit a password (by _id)
app.put('/', async (req, res) => {
    const { id, site, username, password } = req.body; // data from frontend
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    try {
        const updateResult = await collection.updateOne(
            { _id: new ObjectId(id) },  // find document by id
            { $set: { site, username, password } } // update fields
        );
        res.send({ success: true, result: updateResult });
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: "Update failed" });
    }
});

// Delete a password by id
app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    // ✅ Define db and collection here
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    try {
        // ✅ Add this check to validate the ID
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: 'Invalid ID format.' });
        }
        
        const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).send({ success: false, message: 'Password not found.' });
        }
        res.send({ success: true, result: deleteResult });

    } catch (err) {
        console.error('An unexpected error occurred:', err);
        res.status(500).send({ success: false, message: 'Internal Server Error.' });
    }
});

app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`)
})