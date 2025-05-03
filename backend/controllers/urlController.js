const shortid = require('shortid');
const Url = require('../models/Url');
const isValidUrl = require('../utils/validateUrl');

exports.createShortUrl = async (req, res) => {
  const { url } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ message: 'Valid URL is required' });
  }

  const shortCode = shortid.generate();

  try {
    const newUrl = new Url({ url, shortCode });
    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.redirectToUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlRecord = await Url.findOne({ shortCode });

    if (!urlRecord) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    urlRecord.accessCount += 1;
    await urlRecord.save();

    res.redirect(urlRecord.url);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.getShortUrlInfo = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlRecord = await Url.findOne({ shortCode });

    if (!urlRecord) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    res.status(200).json({
      id: urlRecord._id,
      url: urlRecord.url,
      shortCode: urlRecord.shortCode,
      createdAt: urlRecord.createdAt,
      updatedAt: urlRecord.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.updateShortUrl = async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ message: 'Valid URL is required' });
  }

  try {
    const urlRecord = await Url.findOne({ shortCode });

    if (!urlRecord) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    urlRecord.url = url;
    urlRecord.updatedAt = new Date().toISOString();
    await urlRecord.save();

    res.status(200).json({
      id: urlRecord._id,
      url: urlRecord.url,
      shortCode: urlRecord.shortCode,
      createdAt: urlRecord.createdAt,
      updatedAt: urlRecord.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.deleteShortUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const deleted = await Url.findOneAndDelete({ shortCode });

    if (!deleted) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.getShortUrlStats = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlRecord = await Url.findOne({ shortCode });

    if (!urlRecord) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    res.status(200).json({
      id: urlRecord._id,
      url: urlRecord.url,
      shortCode: urlRecord.shortCode,
      createdAt: urlRecord.createdAt,
      updatedAt: urlRecord.updatedAt,
      accessCount: urlRecord.accessCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
