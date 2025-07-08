// models/coach.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Coach = sequelize.define('Coach', {
  coachid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  certification: {
    type: DataTypes.STRING(100),
  },
  experienceyears: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false,
  tableName: 'Coach',
});

module.exports = Coach;
