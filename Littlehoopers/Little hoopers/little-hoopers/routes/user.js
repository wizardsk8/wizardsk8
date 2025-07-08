const express = require('express');
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');

const apiBaseUrl = process.env.API_BASE_URL;

router.get('/login', (req, res) => {
  res.render('login', { title: 'User Login', role: 'user' });
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await axios.post(`${apiBaseUrl}/users/login`, { email, password });
    const token = response.data.token;
    req.session.token = token;
    res.redirect('/users/dashboard');
  } catch (error) {
    res.status(401).send('Login failed');
  }
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'User Registration' });
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await axios.post(`${apiBaseUrl}/users/register`, { name, email, password });
    res.redirect('/users/login');
  } catch (error) {
    res.status(400).send('Registration failed');
  }
});

router.get('/dashboard', (req, res) => {
  res.render('userDashboard', { title: 'User Dashboard' });
});

module.exports = router;
