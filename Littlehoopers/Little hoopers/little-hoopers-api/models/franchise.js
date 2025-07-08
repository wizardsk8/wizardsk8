// models/franchise.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Franchise = sequelize.define('Franchise', {
  franchiseid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  contactnumber: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  ownername: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'Franchise',
});

module.exports = Franchise;
