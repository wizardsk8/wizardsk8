// controllers/coachController.js
const { Coach } = require('../models');



exports.getAllCoaches = async (req, res) => {
  try {
    const coaches = await Coach.findAll();
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCoachById = async (req, res) => {
  try {
    const coach = await Coach.findByPk(req.params.id);
    if (coach) {
      res.json(coach);
    } else {
      res.status(404).json({ message: 'Coach not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCoach = async (req, res) => {
  try {
    const coach = await Coach.create(req.body);
    res.status(201).json(coach);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCoach = async (req, res) => {
  try {
    const coach = await Coach.findByPk(req.params.id);
    if (coach) {
      await coach.update(req.body);
      res.json(coach);
    } else {
      res.status(404).json({ message: 'Coach not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCoach = async (req, res) => {
  try {
    const coach = await Coach.findByPk(req.params.id);
    if (coach) {
      await coach.destroy();
      res.json({ message: 'Coach deleted' });
    } else {
      res.status(404).json({ message: 'Coach not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-----------------------------------------------------------------
/*const pool = require('../db');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    const query = 'SELECT * FROM "Coach" WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const coach = result.rows[0];

    if (await bcrypt.compare(password, coach.password)) {
      req.session.coach = { id: coach.coachid, email: coach.email, firstname: coach.firstname, lastname: coach.lastname };
      res.status(200).json({ message: 'Login successful', coach: req.session.coach });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//!

exports.getTrainingSessions = async (req, res) => {
  if (!req.session.coach) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const query = 'SELECT * FROM "TrainingSession" WHERE coachid = $1';
    const result = await pool.query(query, [req.session.coach.id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; */
