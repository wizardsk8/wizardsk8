const express = require('express');
const router = express.Router();

// Login page for admin
router.get('/admin-login', (req, res) => {
    res.render('admin');
});

// Login page for normal user
router.get('/user-login', (req, res) => {
    res.render('user');
});

// Login logic for admin
router.post('/admin-login', (req, res) => {
    // Add logic to authenticate admin
    res.redirect('/');
});

// Login logic for user
router.post('/user-login', (req, res) => {
    // Add logic to authenticate user
    res.redirect('/');
});

module.exports = router;
