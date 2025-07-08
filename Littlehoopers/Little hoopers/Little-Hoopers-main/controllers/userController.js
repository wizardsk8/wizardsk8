// controllers/userController.js
const { User } = require('../models');
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db'); 
const userController = require('../controllers/userController');
const router = express.Router();

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  // try {
  //   const user = await User.create(req.body);
  //   res.status(201).json(user);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
       const { firstname, lastname, email, password, role } = req.body;

      try {
          // Hashong the password
          const saltRounds = 10;
         const hashedPassword = await bcrypt.hash(password, saltRounds);
        
          // Log the original and hashed password
          console.log('Original Password:', password);
          console.log('Hashed Password:', hashedPassword);

          // Inserting the new user with the hashed password into the database
          const result = await pool.query(
              'INSERT INTO "User" (firstname, lastname, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
              [firstname, lastname, email, hashedPassword, role]
          );

 //         // Log the result from the daytabase
         console.log('User Registered:', result.rows[0]);

          // Redirect to the login page upon successful registration
          res.redirect('/login');
      } catch (error) {
          console.error('Error registering user:', error);
          res.status(500).json({ message: 'Username/Email is already registered' });
      }
 };


exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
