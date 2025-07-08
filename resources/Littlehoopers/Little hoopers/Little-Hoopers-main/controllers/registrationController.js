// controllers/registrationController.js
const { Registration } = require('../models');

exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.findAll();
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findByPk(req.params.id);
    if (registration) {
      res.json(registration);
    } else {
      res.status(404).json({ message: 'Registration not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRegistration = async (req, res) => {
  try {
    const registration = await Registration.create(req.body);
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByPk(req.params.id);
    if (registration) {
      await registration.update(req.body);
      res.json(registration);
    } else {
      res.status(404).json({ message: 'Registration not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByPk(req.params.id);
    if (registration) {
      await registration.destroy();
      res.json({ message: 'Registration deleted' });
    } else {
      res.status(404).json({ message: 'Registration not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
