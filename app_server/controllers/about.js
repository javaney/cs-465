const about = (req, res) => {
    res.render('about', {
        title: 'Travlr Getaways',
        pageTitle: 'About',
        currentPage: 'about'
    });
};

module.exports = {
    about
};
