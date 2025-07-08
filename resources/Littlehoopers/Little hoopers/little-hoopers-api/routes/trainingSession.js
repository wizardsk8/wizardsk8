// routes/trainingSession.js
const express = require('express');
const router = express.Router();
const trainingSessionController = require('../controllers/trainingSessionController');

router.get('/', trainingSessionController.getAllTrainingSessions);
router.get('/:id', trainingSessionController.getTrainingSessionById);
router.post('/', trainingSessionController.createTrainingSession);
router.put('/:id', trainingSessionController.updateTrainingSession);
router.delete('/:id', trainingSessionController.deleteTrainingSession);

module.exports = router;
