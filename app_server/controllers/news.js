const fs = require('fs');

const news = (req, res) => {
    var newsData = JSON.parse(fs.readFileSync('./data/news.json', 'utf8'));
    
    res.render('news', {
        title: 'Travlr Getaways',
        pageTitle: 'News',
        currentPage: 'news',
        latestNews: newsData.latestNews,
        vacationTips: newsData.vacationTips
    });
};

module.exports = {
    news
};
