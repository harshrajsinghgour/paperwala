const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true },
  explanation: { type: String }
});

const TestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  durationMinutes: { type: Number, default: 30 },
  totalMarks: { type: Number, default: 100 },
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Test', TestSchema);
