const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const CurrentAffair = require('../models/CurrentAffair');
const Doubt = require('../models/Doubt');
const AppConfig = require('../models/AppConfig');
const DailyChallenge = require('../models/DailyChallenge');

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
    // Agar DB me config nahi hai to default bana de
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
      // अगर आज की तारीख का नहीं मिला, तो लेटेस्ट वाला दिखाएं
      challenge = await DailyChallenge.findOne().sort({ createdAt: -1 });
    }

    if(!challenge) return res.status(404).json({success: false, message: "No challenge found"});

    res.json({ success: true, data: challenge });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
