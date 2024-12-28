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
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/feedback', feedbackRoutes);

// Public route to log in (Firebase will handle authentication)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Perform login with Firebase Authentication - Firebase does this automatically
        const userRecord = await admin.auth().getUserByEmail(email);
        res.json({ message: `Welcome, ${userRecord.email}` });
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
});

// Public route for summary
app.get('/summary', (req, res) => {
    const summaryData = [
        { user: 'Alice', score: 5, comment: 'Excellent!' },
        { user: 'Bob', score: 4, comment: 'Very good!' },
    ];

    res.json({ summary: summaryData });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
