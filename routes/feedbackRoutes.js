// backend/routes/feedbackRoutes.js
const express = require('express');
const { submitFeedback } = require('../controllers/feedbackController');
const { getFeedbacks } = require('../controllers/summaryController');

const router = express.Router();

router.get('/all', getFeedbacks);
router.post('/submit', submitFeedback);


module.exports = router;
