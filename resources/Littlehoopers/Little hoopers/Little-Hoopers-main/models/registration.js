// models/registration.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Registration = sequelize.define('Registration', {
  registrationid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  SessionID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'TrainingSession',
      key: 'SessionID',
    },
  },
  PlayerID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Player',
      key: 'PlayerID',
    },
  },
  DateRegistered: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'Registration',
});

module.exports = Registration;
