// models/feedback.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Feedback = sequelize.define('Feedback', {
  feedbackid: {
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
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comments: {
    type: DataTypes.TEXT,
  },
  dateprovided: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'Feedback',
});

module.exports = Feedback;

