const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const shortid = require('shortid');
const Url = require('./models/url');
const cors = require('cors');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 


app.post('/shorten', async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  const shortCode = shortid.generate();

  try {
    const newUrl = new Url({
      url,
      shortCode,
    });

    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});


app.get('/:shortCode', async (req, res) => {
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
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});


app.get('/shorten/:shortCode', async (req, res) => {
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
});


app.delete('/shorten/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const deleted = await Url.findOneAndDelete({ shortCode });

    if (!deleted) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    return res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});


app.get('/shorten/stats/:shortCode', async (req, res) => {
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
});
