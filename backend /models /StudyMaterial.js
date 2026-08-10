const mongoose = require('mongoose');

const StudyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: {
    type: String,
    enum: ['text', 'image', 'pdf', 'video', 'link'],
    required: true
  },
  contentUrl: { type: String }, // PDF, Image, Video (YouTube/Drive) या Web Link की URL
  textContent: { type: String }, // अगर type === 'text' है तो यहाँ पूरे नोट्स रहेंगे
  subject: { type: String, default: 'General' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudyMaterial', StudyMaterialSchema);
