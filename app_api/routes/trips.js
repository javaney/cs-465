const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const tripsController = require('../controllers/trips');

// JWT Authentication middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if(authHeader == null) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  if(token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if(err) return res.sendStatus(401);
    req.auth = verified;
    next();
  });
}

// GET: /api/trips - list all trips
router.get('/trips', tripsController.tripsList);

// GET: /api/trips/:tripid - get a single trip by ID
router.get('/trips/:tripid', tripsController.tripsReadOne);

// GET: /api/trips/code/:tripcode - get a single trip by code
router.get('/trips/code/:tripcode', tripsController.tripsFindCode);

// POST: /api/trips - add a new trip (protected)
router.post('/trips', authenticateJWT, tripsController.tripsAddTrip);

// PUT: /api/trips/:tripcode - update a trip by code (protected)
router.put('/trips/:tripcode', authenticateJWT, tripsController.tripsUpdateTrip);

// DELETE: /api/trips/:tripcode - delete a trip by code (protected)
router.delete('/trips/:tripcode', authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;
