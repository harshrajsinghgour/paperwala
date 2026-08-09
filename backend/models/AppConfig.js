const mongoose = require('mongoose');

const AppConfigSchema = new mongoose.Schema({
  appName: { type: String, default: 'Paper Wala' },
  contactEmail: { type: String, default: 'support@paperwala.com' },
  contactPhone: { type: String, default: '+91 9876543210' },
  noticeText: { type: String },
  banners: [{
    imageUrl: { type: String, required: true },
    targetRoute: { type: String } // e.g. '/mock-tests' or '/notes'
  }],
  latestVersion: { type: String, default: '1.0.0' }
});

module.exports = mongoose.model('AppConfig', AppConfigSchema);
