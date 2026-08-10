const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const CurrentAffair = require('../models/CurrentAffair');
const Doubt = require('../models/Doubt');
const AppConfig = require('../models/AppConfig');
const DailyChallenge = require('../models/DailyChallenge');
const Result = require('../models/Result');

// 1. Get Notes by Category
router.get('/notes/:category', async (req, res) => {
  try {
    const notes = await Note.find({ category: req.params.category });
    res.json({ success: true, data: notes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Get Current Affairs - Latest 30
router.get('/current-affairs', async (req, res) => {
  try {
    const affairs = await CurrentAffair.find().sort({ date: -1 }).limit(30);
    res.json({ success: true, data: affairs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Submit a Doubt
router.post('/doubts', async (req, res) => {
  try {
    const doubt = new Doubt(req.body);
    await doubt.save();
    res.status(201).json({ success: true, data: doubt });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Get User Doubts & Chat
router.get('/doubts/user/:userId', async (req, res) => {
  try {
    const doubts = await Doubt.find({ studentId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: doubts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Get App Config & Banners - Flutter/Web App Launch pe call hoga
router.get('/app-config', async (req, res) => {
  try {
    let config = await AppConfig.findOne();
    if (!config) {
      config = new AppConfig();
      await config.save();
    }
    res.json({ success: true, data: config });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. आज का Daily Challenge फैच करें
router.get('/daily-challenge/today', async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    let challenge = await DailyChallenge.findOne({ date: todayStr });

    if (!challenge) {
      challenge = await DailyChallenge.findOne().sort({ createdAt: -1 });
    }

    if(!challenge) return res.status(404).json({success: false, message: "No challenge found"});

    res.json({ success: true, data: challenge });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Dynamic Leaderboard API - NAYA ADD KIYA
router.get('/leaderboard', async (req, res) => {
  try {
    const { timeframe } = req.query; // 'daily', 'weekly', 'monthly'
    let startDate = new Date();

    if (timeframe === 'daily') {
      startDate.setHours(0, 0, 0, 0);
    } else if (timeframe === 'weekly') {
      const day = startDate.getDay();
      const diff = startDate.getDate() - day + (day === 0? -6 : 1); // Monday se start
      startDate = new Date(startDate.setDate(diff));
      startDate.setHours(0, 0, 0, 0);
    } else if (timeframe === 'monthly') {
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
    } else {
      startDate = new Date(0); // All-time default
    }

    const leaderboard = await Result.aggregate([
      { $match: { createdAt: { $gte: startDate } },
      {
        $group: {
          _id: "$studentId",
          totalScore: { $sum: "$score" },
          testsAttempted: { $sum: 1 }
        }
      },
      { $sort: { totalScore: -1 } },
      { $limit: 50 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          userId: "$_id",
          name: "$user.name",
          isProUser: "$user.isProUser",
          totalScore: 1,
          testsAttempted: 1
        }
      }
    ]);

    res.json({ success: true, data: leaderboard });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
