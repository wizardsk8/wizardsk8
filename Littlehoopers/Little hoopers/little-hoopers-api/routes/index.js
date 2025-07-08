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

// Define associations
User.hasMany(Player, { foreignKey: 'ParentID' });
Player.belongsTo(User, { foreignKey: 'ParentID' });

Coach.hasMany(TrainingSession, { foreignKey: 'CoachID' });
TrainingSession.belongsTo(Coach, { foreignKey: 'CoachID' });

TrainingSession.hasMany(Registration, { foreignKey: 'SessionID' });
Registration.belongsTo(TrainingSession, { foreignKey: 'SessionID' });

Player.hasMany(Registration, { foreignKey: 'PlayerID' });
Registration.belongsTo(Player, { foreignKey: 'PlayerID' });

TrainingSession.hasMany(Feedback, { foreignKey: 'SessionID' });
Feedback.belongsTo(TrainingSession, { foreignKey: 'SessionID' });

Player.hasMany(Feedback, { foreignKey: 'PlayerID' });
Feedback.belongsTo(Player, { foreignKey: 'PlayerID' });

Franchise.hasMany(Facility, { foreignKey: 'FranchiseID' });
Facility.belongsTo(Franchise, { foreignKey: 'FranchiseID' });

Facility.hasMany(Equipment, { foreignKey: 'FacilityID' });
Equipment.belongsTo(Facility, { foreignKey: 'FacilityID' });

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
