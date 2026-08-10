const mongoose = require('mongoose');

const DailyChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g. "Daily GS & Current Affairs Challenge - 10 Aug"
  date: { type: String, required: true },  // YYYY-MM-DD
  durationMinutes: { type: Number, default: 10 },
  totalMarks: { type: Number, default: 20 },
  questions: [{
    questionText: String,
    options: [String],
    correctOptionIndex: Number,
    explanation: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DailyChallenge', DailyChallengeSchema);
