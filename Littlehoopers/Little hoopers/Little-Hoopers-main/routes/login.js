const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');

router.use(bodyParser.json()); 
router.use(session({
    secret: 'your_secret_key', // Replace with a strong, random secret password or something
    resave: false,
    saveUninitialized: true
}));

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Basketball',
    database: 'little_hoopers',
    port: 5432,
    ssl: false // To disable SSL
});

// Login endpoint
router.post('/logined', async (req, res) => {
    const { username, password } = req.body;
    
    console.log(`Received login request for username: ${username}`);

    try {
        // Query user from database
        const user = await pool.query('SELECT * FROM "User" WHERE email = $1', [username]);

        // Check if user exists
        if (user.rows.length === 0) {
            console.log('User not found');
            res.redirect('/login');
            
            return;
        }

        // Verify password
        const storedPassword = user.rows[0].password;
        console.log(`Stored password: ${storedPassword}`);
        const passwordMatch = await bcrypt.compare(password, storedPassword);
        console.log(`Password match: ${passwordMatch}`);

        if (!passwordMatch) {
            console.log('Password does not match');
            res.redirect('/login');
            
            return;
        }

        // Store user information in session
        req.session.user = user.rows[0];
        console.log('User logged in successfully');

        // Redirect to dashboard
        res.redirect('/dashboard');

    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
});

module.exports = router;
