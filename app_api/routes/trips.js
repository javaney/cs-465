const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// GET: /api/trips - list all trips
router.get('/trips', tripsController.tripsList);

// GET: /api/trips/:tripid - get a single trip by ID
router.get('/trips/:tripid', tripsController.tripsReadOne);

// GET: /api/trips/code/:tripcode - get a single trip by code
router.get('/trips/code/:tripcode', tripsController.tripsFindCode);

module.exports = router;
