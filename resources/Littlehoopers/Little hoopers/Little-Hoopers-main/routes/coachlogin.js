/*const express = require('express');
const router = express.Router();
const pool = require('../db'); // Ensure the path to your db module is correct

// Route to serve the coach dashboard HTML file
router.get('/', (req, res) => {
    res.sendFile('/public/coachlogin.html'); // Adjust the path as necessary
});

// Route to fetch coach info
/*router.get('/info', async (req, res) => {
    try {
        const coachEmail = req.session.coachEmail; // Assuming coachEmail is stored in the session
        const result = await pool.query('SELECT * FROM "Coach" WHERE email = $1', [coachEmail]);

        if (result.rows.length > 0) {
            const coach = result.rows[0];
            res.json({ name: coach.name, email: coach.email });
        } else {
            res.status(404).json({ message: 'Coach not found' });
        }
    } catch (error) {
        console.error('Error fetching coach info:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});*/

// Route to fetch training sessions
/*router.get('/training-sessions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "TrainingSession"');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching training sessions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router; */





