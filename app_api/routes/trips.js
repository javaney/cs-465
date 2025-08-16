const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// GET: /api/trips - list all trips
router.get('/trips', tripsController.tripsList);

// GET: /api/trips/:tripid - get a single trip by ID
router.get('/trips/:tripid', tripsController.tripsReadOne);

// GET: /api/trips/code/:tripcode - get a single trip by code
router.get('/trips/code/:tripcode', tripsController.tripsFindCode);

// POST: /api/trips - add a new trip
router.post('/trips', tripsController.tripsAddTrip);

// PUT: /api/trips/:tripcode - update a trip by code
router.put('/trips/:tripcode', tripsController.tripsUpdateTrip);

// DELETE: /api/trips/:tripcode - delete a trip by code
router.delete('/trips/:tripcode', tripsController.tripsDeleteTrip);

module.exports = router;
