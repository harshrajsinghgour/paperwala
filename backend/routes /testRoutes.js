const express = require('express');
const Test = require('../models/Test');
const Result = require('../models/Result');
const User = require('../models/User');

const router = express.Router();

// Fetch Tests by Category
router.get('/:category', async (req, res) => {
  try {
    const tests = await Test.find({ category: req.params.category });
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit Test Result
router.post('/submit', async (req, res) => {
  try {
    const { userId, testId, score, totalQuestions } = req.body;

    const result = new Result({ userId, testId, score, totalQuestions });
    await result.save();

    await User.findByIdAndUpdate(userId, { $inc: { totalScore: score } });

    res.status(201).json({ message: 'Result saved successfully', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Leaderboard
router.get('/leaderboard/top', async (req, res) => {
  try {
    const leaderboard = await User.find()
      .select('name totalScore targetExam')
      .sort({ totalScore: -1 })
      .limit(20);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
