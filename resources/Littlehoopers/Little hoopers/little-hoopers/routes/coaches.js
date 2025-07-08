const express = require('express');
const router = express.Router();
const axios = require('axios');

// Coaches page
router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.littlehoopers.com/coaches');
        const coaches = response.data;
        res.render('coaches', { coaches });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving coaches');
    }
});

module.exports = router;
