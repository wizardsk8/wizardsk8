// controllers/facilityController.js
const { Facility } = require('../models');

exports.getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.findAll();
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.id);
    if (facility) {
      res.json(facility);
    } else {
      res.status(404).json({ message: 'Facility not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createFacility = async (req, res) => {
  try {
    const facility = await Facility.create(req.body);
    res.status(201).json(facility);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.id);
    if (facility) {
      await facility.update(req.body);
      res.json(facility);
    } else {
      res.status(404).json({ message: 'Facility not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.id);
    if (facility) {
      await facility.destroy();
      res.json({ message: 'Facility deleted' });
    } else {
      res.status(404).json({ message: 'Facility not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
