const mongoose = require('mongoose');

const CurrentAffairSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: 'National' }, // National, Sports, Defense
  imageUrl: { type: String },
  date: { type: Date, default: Date.now },
  tags: [{ type: String }]
});

module.exports = mongoose.model('CurrentAffair', CurrentAffairSchema);
