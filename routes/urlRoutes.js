const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl } = require('../controllers/urlController');

// Route for shortening URLs
router.post('/shorten', shortenUrl);

// Route for redirecting using the short URL
router.get('/:shortUrl', redirectUrl);

module.exports = router;
