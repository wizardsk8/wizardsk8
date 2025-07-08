// controllers/trainingSessionController.js
const { TrainingSession } = require('../models');

exports.getAllTrainingSessions = async (req, res) => {
  try {
    const sessions = await TrainingSession.findAll();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrainingSessionById = async (req, res) => {
  try {
    const session = await TrainingSession.findByPk(req.params.id);
    if (session) {
      res.json(session);
    } else {
      res.status(404).json({ message: 'Training session not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTrainingSession = async (req, res) => {
  try {
    const session = await TrainingSession.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTrainingSession = async (req, res) => {
  try {
    const session = await TrainingSession.findByPk(req.params.id);
    if (session) {
      await session.update(req.body);
      res.json(session);
    } else {
      res.status(404).json({ message: 'Training session not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTrainingSession = async (req, res) => {
  try {
    const session = await TrainingSession.findByPk(req.params.id);
    if (session) {
      await session.destroy();
      res.json({ message: 'Training session deleted' });
    } else {
      res.status(404).json({ message: 'Training session not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
