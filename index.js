// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const { connectDB } = require('./db');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json())

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/feedback', feedbackRoutes);

// Public route for summary
app.get('/summary', (req, res) => {
    const summaryData = [
        { user: 'Alice', score: 5, comment: 'Excellent!' },
        { user: 'Bob', score: 4, comment: 'Very good!' },
    ];

    res.json({ summary: summaryData });
});

app.get('/', (req, res) => {
    res.send('RateIsExperience server is running')
});

app.all("*", (req, res)=>{
    res.send("No routes found")
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
