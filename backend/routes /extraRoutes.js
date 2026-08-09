const express = require('express');
const Note = require('../models/Note');
const CurrentAffair = require('../models/CurrentAffair');
const Doubt = require('../models/Doubt');
const AppConfig = require('../models/AppConfig');

const router = express.Router();

// 1. Get Notes by Category
router.get('/notes/:category', async (req, res) => {
  try {
    const notes = await Note.find({ category: req.params.category });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get Current Affairs
router.get('/current-affairs', async (req, res) => {
  try {
    const affairs = await CurrentAffair.find().sort({ date: -1 }).limit(30);
    res.json(affairs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Submit a Doubt
router.post('/doubts', async (req, res) => {
  try {
    const doubt = new Doubt(req.body);
    await doubt.save();
    res.status(201).json(doubt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get User Doubts & Chat
router.get('/doubts/user/:userId', async (req, res) => {
  try {
    const doubts = await Doubt.find({ studentId: req.params.userId }).sort({ createdAt: -1 });
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Get App Config & Banners
router.get('/app-config', async (req, res) => {
  try {
    const config = await AppConfig.findOne();
    res.json(config || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
