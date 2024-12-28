const { getDB } = require('../db');


module.exports.getFeedbacks = async (req, res) => {
    const db = getDB();
    const feedbackColl = db.collection("feedbacks")
    const feedbacks = await feedbackColl.find({}).toArray();
    console.log(feedbacks);
    res.send(feedbacks);
}