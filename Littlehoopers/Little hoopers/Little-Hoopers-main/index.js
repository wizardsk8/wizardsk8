require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');




const app = express();
const port = 3000;

const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const contactRoutes = require('./routes/contact');
const playerRoutes = require('./routes/player');
const coachRoutes = require('./routes/coach');
const trainingSessionRoutes = require('./routes/trainingSession');
const registrationRoutes = require('./routes/registration');
const feedbackRoutes = require('./routes/feedback');
const franchiseRoutes = require('./routes/franchise');
const facilityRoutes = require('./routes/facility');
const equipmentRoutes = require('./routes/equipment');

//const coachlogRoutes = require('./routes/coachlogin');

// Databvase connection
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'Kelito12',
  database: 'little_hoopers',
  port: 5432,
  ssl: false,
});

// Middlkeware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static('views'));
app.use(express.static('public'));


// Routes
app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/contact', contactRoutes);
app.use('/players', playerRoutes);
app.use('/coaches', coachRoutes);
app.use('/trainingSessions', trainingSessionRoutes);
app.use('/registrations', registrationRoutes);
app.use('/feedbacks', feedbackRoutes);
app.use('/franchises', franchiseRoutes);
app.use('/facilities', facilityRoutes);
app.use('/equipment', equipmentRoutes);


app.post('/users/register', (req, res) => { 
  console.log(req.body); 
  res.send('Form submitted successfully');
});
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send('Logout failed');
      }
      res.status(200).send('Logout successful');
  });
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Login page (2).html'));
});
app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', { user: req.session.user });
  } else {
    res.redirect('/login');
  }
});


// Remember to comback to delete usless code when done


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

