// API endpoint configuration
const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

// GET travel view
const travel = async (req, res) => {
    // console.log('TRAVEL CONTROLLER START');

    fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            // console.log(json);

            // Additional error handling for API responses
            if (!Array.isArray(json)) {
                console.log('API response is not an array');
                return res.status(500).send('Invalid data format from API');
            }

            if (json.length === 0) {
                console.log('No trips found in database');
                return res.render('travel', {
                    title: 'Travlr Getaways',
                    pageTitle: 'Travel',
                    currentPage: 'travel',
                    trips: [],
                    message: 'No trips available at this time'
                });
            }

            res.render('travel', {
                title: 'Travlr Getaways',
                pageTitle: 'Travel',
                currentPage: 'travel',
                trips: json
            });
        })
        .catch(err => {
            console.log('API Error:', err.message);
            res.status(500).send(err.message);
        });

    // console.log('TRAVEL CONTROLLER END');
};

module.exports = {
    travel
};
