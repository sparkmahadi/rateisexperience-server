// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const { connectDB, getDB } = require('./db');
const feedbackRoutes = require('./routes/feedbackRoutes');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

// Middleware
app.use(cors());
app.use(express.json())

// Connect to MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gp7ekja.mongodb.net/?retryWrites=true&w=majority`;
// const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const feedbackColl = client.db("fahad-feedback").collection("feedbacks");

    app.get('/api/feedback/all', async (req, res) => {
        const feedbacks = await feedbackColl.find({}).toArray();
        console.log(feedbacks);
        res.send(feedbacks);
    })

    app.post('/api/feedback/submit', async (req, res) => {
        try {
            const feedbackData = req.body;
    
            // Insert feedback data into the MongoDB collection
            await feedbackColl.insertOne(feedbackData);
    
            res.status(201).json({ message: 'Feedback submitted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error submitting feedback' });
        }
    })
}

run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('RateIsExperience server is running')
});

app.all("*", (req, res) => {
    res.send("No routes found")
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
