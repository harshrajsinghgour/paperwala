const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderName: { type: String, required: true },
  message: { type: String, required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const DoubtSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  questionText: { type: String, required: true },
  imageUrl: { type: String },
  status: { type: String, enum: ['Pending', 'Solved'], default: 'Pending' },
  messages: [MessageSchema], // चैट हिस्ट्री
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doubt', DoubtSchema);
