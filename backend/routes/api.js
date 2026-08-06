const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const testController = require('../controllers/testController');
const contentController = require('../controllers/contentController');

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Test Series Routes
router.get('/tests', testController.getTests);
router.get('/tests/:testId/questions', testController.getTestQuestions);
router.post('/tests/submit', testController.submitTest);
router.get('/user/progress/:userId', testController.getUserProgress);

// Content Routes
router.get('/paperwala-info', contentController.getPaperWalaInfo);
router.get('/current-affairs', contentController.getCurrentAffairs);
router.get('/notes', contentController.getNotes);

module.exports = router;
