const express = require('express');
const router = express.Router();
const axios = require('axios');

const apiBaseUrl = process.env.API_BASE_URL;

router.get('/login', (req, res) => {
  res.render('login', { title: 'Admin Login', role: 'admin' });
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await axios.post(`${apiBaseUrl}/users/login`, { email, password });
    const token = response.data.token;
    req.session.token = token;
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(401).send('Login failed');
  }
});

router.get('/dashboard', (req, res) => {
  res.render('adminDashboard', { title: 'Admin Dashboard' });
});

module.exports = router;
