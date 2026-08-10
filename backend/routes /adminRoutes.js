const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');

const User = require('../models/User');
const Test = require('../models/Test');
const Note = require('../models/Note');
const CurrentAffair = require('../models/CurrentAffair');
const Doubt = require('../models/Doubt');
const AppConfig = require('../models/AppConfig');

// 1. Dashboard Overview Stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTests = await Test.countDocuments();
    const totalNotes = await Note.countDocuments();
    const pendingDoubts = await Doubt.countDocuments({ status: 'Pending' });

    res.json({ totalUsers, totalTests, totalNotes, pendingDoubts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. USER MANAGEMENT
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/users/:id/toggle-pro', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isProUser = !user.isProUser;
    await user.save();
    res.json({ message: 'User Pro status updated', isProUser: user.isProUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. TEST MANAGEMENT
router.post('/tests', adminAuth, async (req, res) => {
  try {
    const newTest = new Test(req.body);
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/tests/:id', adminAuth, async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.json({ message: 'Test deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. NOTES MANAGEMENT
router.post('/notes', adminAuth, async (req, res) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/notes/:id', adminAuth, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. CURRENT AFFAIRS MANAGEMENT
router.post('/current-affairs', adminAuth, async (req, res) => {
  try {
    const affair = new CurrentAffair(req.body);
    await affair.save();
    res.status(201).json(affair);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/current-affairs/:id', adminAuth, async (req, res) => {
  try {
    await CurrentAffair.findByIdAndDelete(req.params.id);
    res.json({ message: 'Current Affair deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. DOUBT RESOLUTION (REPLY TO STUDENT)
router.get('/doubts', adminAuth, async (req, res) => {
  try {
    const doubts = await Doubt.find().populate('studentId', 'name email').sort({ createdAt: -1 });
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/doubts/reply', adminAuth, async (req, res) => {
  try {
    const { doubtId, adminMessage } = req.body;
    const doubt = await Doubt.findById(doubtId);

    if (!doubt) return res.status(404).json({ message: 'Doubt not found' });

    doubt.messages.push({
      senderId: req.user._id,
      senderName: 'Admin Support',
      message: adminMessage
    });
    doubt.status = 'Solved';

    await doubt.save();
    res.json({ message: 'Reply sent successfully', doubt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. APP CONFIG & BANNERS CONTROL
router.post('/app-config', adminAuth, async (req, res) => {
  try {
    let config = await AppConfig.findOne();
    if (!config) {
      config = new AppConfig(req.body);
    } else {
      Object.assign(config, req.body);
    }
    await config.save();
    res.json({ message: 'App Config Updated', config });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
              
