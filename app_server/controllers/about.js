const about = (req, res) => {
    res.render('about', {
        title: 'Travlr Getaways',
        pageTitle: 'About'
    });
};

module.exports = {
    about
};
