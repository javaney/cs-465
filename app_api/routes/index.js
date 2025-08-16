const express = require('express');
const router = express.Router();
const tripsRouter = require('./trips');
const authController = require('../controllers/authentication');

// Enable CORS for all API routes
router.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Authentication routes
router.route('/api/register').post(authController.register);
router.route('/api/login').post(authController.login);

// Define route for our trips endpoint
router.use('/api', tripsRouter);

module.exports = router;
