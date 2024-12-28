// backend/controllers/feedbackController.js
const { getDB } = require('../db');

const submitFeedback = async (req, res) => {
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
};

module.exports = { submitFeedback };
