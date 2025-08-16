const Trip = require('../models/travlr');

// GET: /api/trips - lists all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});
        if (!trips || trips.length === 0) {
            return res.status(404).json({
                "message": "No trips found"
            });
        }
        res.status(200).json(trips);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "message": "Error retrieving trips",
            "error": err.message
        });
    }
};

// GET: /api/trips/:tripid - returns a single trip
const tripsReadOne = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.tripid);
        if (!trip) {
            return res.status(404).json({
                "message": "Trip not found"
            });
        }
        res.status(200).json(trip);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "message": "Error retrieving trip",
            "error": err.message
        });
    }
};

// GET: /api/trips/code/:tripcode - returns a single trip by code
const tripsFindCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({ code: req.params.tripcode });
        if (!trip) {
            return res.status(404).json({
                "message": "Trip not found"
            });
        }
        res.status(200).json(trip);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "message": "Error retrieving trip",
            "error": err.message
        });
    }
};

// POST: /api/trips - add a new trip
const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = new Trip(req.body);
        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            "message": "Error creating trip",
            "error": err.message
        });
    }
};

// PUT: /api/trips/:tripcode - update a trip by code
const tripsUpdateTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndUpdate(
            { 'code': req.params.tripcode },
            req.body,
            { new: true, runValidators: true }
        );
        if (!trip) {
            return res.status(404).json({
                "message": "Trip not found"
            });
        }
        res.status(200).json(trip);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            "message": "Error updating trip",
            "error": err.message
        });
    }
};

// DELETE: /api/trips/:tripcode - delete a trip by code
const tripsDeleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({ 'code': req.params.tripcode });
        if (!trip) {
            return res.status(404).json({
                "message": "Trip not found"
            });
        }
        res.status(200).json({
            "message": "Trip deleted successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "message": "Error deleting trip",
            "error": err.message
        });
    }
};

module.exports = {
    tripsList,
    tripsReadOne,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
