const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  redirectToUrl,
  getShortUrlInfo,
  updateShortUrl,
  deleteShortUrl,
  getShortUrlStats
} = require('../controllers/urlController');

router.post('/shorten', createShortUrl);
router.get('/:shortCode', redirectToUrl);
router.get('/shorten/:shortCode', getShortUrlInfo);
router.put('/shorten/:shortCode', updateShortUrl);
router.delete('/shorten/:shortCode', deleteShortUrl);
router.get('/shorten/stats/:shortCode', getShortUrlStats);

module.exports = router;
