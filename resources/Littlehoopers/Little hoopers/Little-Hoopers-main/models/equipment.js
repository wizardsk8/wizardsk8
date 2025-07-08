// models/equipment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Equipment = sequelize.define('Equipment', {
  equipmentid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  facilityid: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Facility',
      key: 'facilityid',
    },
  },
}, {
  timestamps: false,
  tableName: 'Equipment',
});

module.exports = Equipment;
