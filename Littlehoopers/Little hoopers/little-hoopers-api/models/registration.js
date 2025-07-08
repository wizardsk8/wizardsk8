// models/registration.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Registration = sequelize.define('Registration', {
  registrationid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sessionid: {
    type: DataTypes.INTEGER,
    references: {
      model: 'TrainingSession',
      key: 'sessionid',
    },
  },
  playerid: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Player',
      key: 'playerid',
    },
  },
  dateregistered: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'Registration',
});

module.exports = Registration;

