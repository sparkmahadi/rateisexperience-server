// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const { connectDB, getDB } = require('./db');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json())

// Connect to MongoDB
connectDB();

// Public route for summary
app.get('/api/feedback/all', async (req, res) => {
    const db = getDB();
    const feedbackColl = db.collection("feedbacks")
    const feedbacks = await feedbackColl.find({}).toArray();
    console.log(feedbacks);
    res.send(feedbacks);
})

app.post('/submit', async (req, res) => {
    try {
        const db = getDB();
        const feedbackCollection = db.collection('feedbacks'); // Feedback collection
        const feedbackData = req.body;

        // Insert feedback data into the MongoDB collection
        await feedbackCollection.insertOne(feedbackData);

        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error submitting feedback' });
    }
})

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
