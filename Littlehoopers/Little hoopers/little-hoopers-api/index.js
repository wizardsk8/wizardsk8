// app.js
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/user');
const playerRoutes = require('./routes/player');
const coachRoutes = require('./routes/coach');
const trainingSessionRoutes = require('./routes/trainingSession');
const registrationRoutes = require('./routes/registration');
const feedbackRoutes = require('./routes/feedback');
const franchiseRoutes = require('./routes/franchise');
const facilityRoutes = require('./routes/facility');
const equipmentRoutes = require('./routes/equipment');

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/trainingSessions', trainingSessionRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/franchises', franchiseRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/equipment', equipmentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Little Hoopers API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3001;

// Database connection and server start
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync database models
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized.');
    
    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Little Hoopers API server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();

