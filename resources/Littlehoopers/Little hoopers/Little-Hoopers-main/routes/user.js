 const express = require('express');
 const bcrypt = require('bcrypt');
 const pool = require('../db'); 
 const userController = require('../controllers/userController');
 const router = express.Router();


 router.post('/', userController.createUser);

 module.exports = router;
