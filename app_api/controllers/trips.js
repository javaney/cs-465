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

module.exports = {
    tripsList,
    tripsReadOne,
    tripsFindCode
};
