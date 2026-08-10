const mongoose = require('mongoose');

const AppConfigSchema = new mongoose.Schema({
  // 1. BASIC APP INFO
  appName: { type: String, default: 'Paper Wala' },
  contactEmail: { type: String, default: 'support@paperwala.com' },
  contactPhone: { type: String, default: '+91 9876543210' },

  // 2. NOTICE & BANNERS
  noticeText: { type: String, default: '🔥 Paper Wala App me aapka swagat hai!' },
  banners: [{ 
    imageUrl: { type: String, required: true },
    targetRoute: { type: String }, // e.g. '/mock-tests' or '/notes'
    linkUrl: { type: String } // purane wale ke liye backup
  }],

  // 3. APP MAINTENANCE & UPDATE CONTROL
  isMaintenanceMode: { type: Boolean, default: false },
  maintenanceMessage: { type: String, default: 'App is currently under maintenance. We will be back soon!' },
  latestVersion: { type: String, default: '1.0.0' },
  forceUpdate: { type: Boolean, default: false },

  // 4. DYNAMIC FEATURE FLAGS
  isTestSeriesEnabled: { type: Boolean, default: true },
  isNotesEnabled: { type: Boolean, default: true },
  isCurrentAffairsEnabled: { type: Boolean, default: true },
  isDoubtSectionEnabled: { type: Boolean, default: true },

  // 5. COMPLETE AD CONTROL SYSTEM
  isAdsEnabled: { type: Boolean, default: true },
  disableAdsForPro: { type: Boolean, default: true },
  interstitialAdFrequency: { type: Number, default: 3 }, // Har 3 clicks par ad
  admobBannerId: { type: String, default: 'ca-app-pub-3940256099942544/6300978111' }, // Test ID
  admobInterstitialId: { type: String, default: 'ca-app-pub-3940256099942544/1033173712' },
  admobRewardedId: { type: String, default: 'ca-app-pub-3940256099942544/5224354917' },

  updatedAt: { type: Date, default: Date.now }
});

// update hote time updatedAt auto change ho
AppConfigSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('AppConfig', AppConfigSchema);
