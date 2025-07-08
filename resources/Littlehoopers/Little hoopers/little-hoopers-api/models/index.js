// models/index.js
const sequelize = require('../config/database');
const User = require('./user');
const Player = require('./player');
const Coach = require('./coach');
const TrainingSession = require('./trainingSession');
const Registration = require('./registration');
const Feedback = require('./feedback');
const Franchise = require('./franchise');
const Facility = require('./facility');
const Equipment = require('./equipment');

// Define associations with correct field names
User.hasMany(Player, { foreignKey: 'parentid' });
Player.belongsTo(User, { foreignKey: 'parentid' });

Coach.hasMany(TrainingSession, { foreignKey: 'coachid' });
TrainingSession.belongsTo(Coach, { foreignKey: 'coachid' });

TrainingSession.hasMany(Registration, { foreignKey: 'sessionid' });
Registration.belongsTo(TrainingSession, { foreignKey: 'sessionid' });

Player.hasMany(Registration, { foreignKey: 'playerid' });
Registration.belongsTo(Player, { foreignKey: 'playerid' });

TrainingSession.hasMany(Feedback, { foreignKey: 'sessionid' });
Feedback.belongsTo(TrainingSession, { foreignKey: 'sessionid' });

Player.hasMany(Feedback, { foreignKey: 'playerid' });
Feedback.belongsTo(Player, { foreignKey: 'playerid' });

Franchise.hasMany(Facility, { foreignKey: 'franchiseid' });
Facility.belongsTo(Franchise, { foreignKey: 'franchiseid' });

Facility.hasMany(Equipment, { foreignKey: 'facilityid' });
Equipment.belongsTo(Facility, { foreignKey: 'facilityid' });

module.exports = {
  sequelize,
  User,
  Player,
  Coach,
  TrainingSession,
  Registration,
  Feedback,
  Franchise,
  Facility,
  Equipment,
};

