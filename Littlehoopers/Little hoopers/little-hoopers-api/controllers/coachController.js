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
