// models/facility.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Facility = sequelize.define('Facility', {
  facilityid: {
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
  franchiseid: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Franchise',
      key: 'franchiseid',
    },
  },
}, {
  timestamps: false,
  tableName: 'Facility',
});

module.exports = Facility;
