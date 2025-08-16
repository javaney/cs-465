const express = require('express');
const router = express.Router();
const tripsRouter = require('./trips');

// Define route for our trips endpoint
router.use('/api', tripsRouter);

module.exports = router;
