const shortid = require('shortid');
const Url = require('../models/Url');

// Shorten the URL
exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  // Check if the URL already exists
  let url = await Url.findOne({ originalUrl });
  if (url) {
    return res.json(url);
  }

  // Create short URL
  const shortUrl = shortid.generate();
  url = new Url({ originalUrl, shortUrl });
  await url.save();

  res.json(url);
};

// Redirect to the original URL
exports.redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;

  const url = await Url.findOne({ shortUrl });
  if (url) {
    url.clicks++;  // Increment the clicks counter
    await url.save();
    return res.redirect(url.originalUrl);
  } else {
    res.status(404).json('URL not found');
  }
};
