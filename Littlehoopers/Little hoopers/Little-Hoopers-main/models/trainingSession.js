// models/trainingSession.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TrainingSession = sequelize.define('TrainingSession', {
  SessionID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  SessionName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Level: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  CoachID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Coach',
      key: 'CoachID',
    },
  },
  Date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  Time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  Duration: {
    type: DataTypes.INTEGER, // Duration in minutes
    allowNull: false,
  },
  Location: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'TrainingSession',
});

module.exports = TrainingSession;
