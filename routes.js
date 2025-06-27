const express = require('express');
const router = express.Router();
const Model = require('../models/model');

// Home Page
router.get('/', (req, res) => {
  res.render('page1');
});

// Example Page 2
router.get('/page2', (req, res) => {
  res.render('page2');
});

// Example Form Submission
router.post('/submit', async (req, res) => {
  try {
    const data = new Model(req.body);
    await data.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error saving data');
  }
});

module.exports = router;