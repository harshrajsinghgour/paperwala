const mongoose = require('mongoose');

const UserAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  wrongAnswers: { type: Number, required: true },
  skippedQuestions: { type: Number, required: true },
  timeTakenSeconds: { type: Number },
  userResponses: [{
    questionId: String,
    selectedOptionIndex: Number,
    isCorrect: Boolean
  }],
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserAttempt', UserAttemptSchema);
