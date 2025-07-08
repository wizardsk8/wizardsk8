const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  res.render('index', { title: 'Little Hoopers' });
});

router.get('/programs', (req, res) => {
  res.render('programs', { title: 'Programs and Classes' });
});

router.get('/camps', (req, res) => {
  res.render('camps', { title: 'Camps and Clinics' });
});

router.get('/private-coaching', (req, res) => {
  res.render('privateCoaching', { title: 'Private Coaching' });
});

router.get('/leagues', (req, res) => {
  res.render('leagues', { title: 'Leagues and Tournaments' });
});

router.get('/birthday-parties', (req, res) => {
  res.render('birthdayParties', { title: 'Birthday Parties' });
});

router.get('/facilities', (req, res) => {
  res.render('facilities', { title: 'Our Facilities' });
});

router.get('/franchise', (req, res) => {
  res.render('franchise', { title: 'Franchise' });
});

module.exports = router;
