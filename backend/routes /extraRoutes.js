const express = require('express');
const router = express.Router();
const AppConfig = require('../models/AppConfig');

// Flutter App fetches this on App Launch
router.get('/app-config', async (req, res) => {
  try {
    let config = await AppConfig.findOne();
    if (!config) {
      config = new AppConfig();
      await config.save();
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
