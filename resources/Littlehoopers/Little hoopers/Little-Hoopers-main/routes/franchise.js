// routes/franchise.js
const express = require('express');
const router = express.Router();
const franchiseController = require('../controllers/franchiseController');

router.get('/', franchiseController.getAllFranchises);
router.get('/:id', franchiseController.getFranchiseById);
router.post('/', franchiseController.createFranchise);
router.put('/:id', franchiseController.updateFranchise);
router.delete('/:id', franchiseController.deleteFranchise);

module.exports = router;
