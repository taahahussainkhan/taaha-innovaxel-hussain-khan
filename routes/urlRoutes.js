const express = require('express');
const router = express.Router();

// Example placeholder route
router.get('/test', (req, res) => {
  res.json({ message: 'URL Shortener API is working!' });
});

module.exports = router;
