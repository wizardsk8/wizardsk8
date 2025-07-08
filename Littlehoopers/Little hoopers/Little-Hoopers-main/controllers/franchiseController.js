// controllers/franchiseController.js
const { Franchise } = require('../models');

exports.getAllFranchises = async (req, res) => {
  try {
    const franchises = await Franchise.findAll();
    res.json(franchises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFranchiseById = async (req, res) => {
  try {
    const franchise = await Franchise.findByPk(req.params.id);
    if (franchise) {
      res.json(franchise);
    } else {
      res.status(404).json({ message: 'Franchise not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createFranchise = async (req, res) => {
  try {
    const franchise = await Franchise.create(req.body);
    res.status(201).json(franchise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFranchise = async (req, res) => {
  try {
    const franchise = await Franchise.findByPk(req.params.id);
    if (franchise) {
      await franchise.update(req.body);
      res.json(franchise);
    } else {
      res.status(404).json({ message: 'Franchise not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFranchise = async (req, res) => {
  try {
    const franchise = await Franchise.findByPk(req.params.id);
    if (franchise) {
      await franchise.destroy();
      res.json({ message: 'Franchise deleted' });
    } else {
      res.status(404).json({ message: 'Franchise not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
