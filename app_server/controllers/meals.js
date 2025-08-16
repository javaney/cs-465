const fs = require('fs');

const meals = (req, res) => {
    var mealsData = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'));
    
    res.render('meals', {
        title: 'Travlr Getaways',
        pageTitle: 'Meals',
        currentPage: 'meals',
        meals: mealsData
    });
};

module.exports = {
    meals
};
