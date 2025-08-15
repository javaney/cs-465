const fs = require('fs');

const rooms = (req, res) => {
    var roomsData = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));
    
    res.render('rooms', { 
        title: 'Travlr Getaways',
        pageTitle: 'Rooms',
        rooms: roomsData 
    });
};

module.exports = {
    rooms
};
