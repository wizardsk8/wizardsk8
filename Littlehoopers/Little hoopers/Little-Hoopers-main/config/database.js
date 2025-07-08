 //config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Set to true for logging SQL queries
});

module.exports = sequelize

//const { Sequelize } = require('sequelize');
//
//// Assuming DATABASE_URL is defined in your environment variables
//const sequelize = new Sequelize(process.env.DATABASE_URL, {
//  dialect: 'postgres',
//  protocol: 'postgres',
//  logging: false, // Set to true if you want to see SQL queries
//});
//
//// Test the database connection
//async function testDatabaseConnection() {
//  try {
//    await sequelize.authenticate();
//    console.log('Connection to the database has been established successfully.');
//  } catch (error) {
//    console.error('Unable to connect to the database:', error);
//  }
//}
//
//// Export the sequelize instance and the testDatabaseConnection function
//module.exports = {
//  sequelize,
//  testDatabaseConnection,
//};
