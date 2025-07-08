// models/player.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Player = sequelize.define('Player', {
  playerid: {
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
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  parentid: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'userid',
    },
  },
  level: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'Player',
});

module.exports = Player;
