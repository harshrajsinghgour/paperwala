const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');

const User = require('../models/User');
const Test = require('../models/Test');
const Note = require('../models/Note');
const CurrentAffair = require('../models/CurrentAffair');
const Doubt = require('../models/Doubt');
const AppConfig = require('../models/AppConfig');

// 1. DASHBOARD OVERVIEW STATS
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTests = await Test.countDocuments();
    const totalNotes = await Note.countDocuments();
    const pendingDoubts = await Doubt.countDocuments({ status: 'Pending' });

    res.json({ success: true, data: { totalUsers, totalTests, totalNotes, pendingDoubts } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. USER MANAGEMENT
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/users/:id/toggle-pro', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.isProUser = !user.isProUser;
    await user.save();
    res.json({ success: true, message: 'User Pro status updated', isProUser: user.isProUser });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/users/:id/toggle-admin', adminAuth, async (req, res) => { // NAYA ADD KIYA
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.isAdmin = !user.isAdmin;
    await user.save();
    res.json({ success: true, message: 'User Admin status updated', isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. TEST MANAGEMENT
router.post('/tests', adminAuth, async (req, res) => {
  try {
    const newTest = new Test(req.body);
    await newTest.save();
    res.status(201).json({ success: true, data: newTest });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/tests/:id', adminAuth, async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Test deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. NOTES MANAGEMENT
router.post('/notes', adminAuth, async (req, res) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(201).json({ success: true, data: newNote });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/notes/:id', adminAuth, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//
