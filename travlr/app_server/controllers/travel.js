const Trip = require('../models/travlr');

const travel = async (req, res) => {
    try {
        const trips = await Trip.find({});
        res.render('travel', {
            title: 'Travlr Getaways',
            pageTitle: 'Travel',
            currentPage: 'travel',
            trips: trips
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving trips');
    }
};

module.exports = {
    travel
};
