// Bring in the DB connection
const mongoose = require('mongoose');

// Connect to MongoDB
const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT || '27017';
const name = process.env.DB_NAME || 'travlr';
const dbURI = `mongodb://${host}:${port}/${name}`;

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

const Trip = require('./travlr');

// Read seed data from JSON file
const fs = require('fs');

// Read the existing trips data
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Delete any existing records, then insert seed data
const seedDB = async () => {
    try {
        await Trip.deleteMany({});
        console.log('Database cleared');
        
        await Trip.create(trips);
        console.log('Database seeded');
        
        mongoose.connection.close();
        console.log('Database connection closed');
    } catch (err) {
        console.log(err);
        mongoose.connection.close();
    }
};

seedDB();
