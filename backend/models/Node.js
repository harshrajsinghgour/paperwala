const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true }, // e.g., History, Maths, GK
  category: { type: String, required: true }, // e.g., SSC CGL, Railway
  pdfUrl: { type: String, required: true },
  fileSize: { type: String, default: '2 MB' },
  isFree: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);
