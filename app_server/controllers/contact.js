const fs = require('fs');

const contact = (req, res) => {
    var contactData = JSON.parse(fs.readFileSync('./data/contact.json', 'utf8'));
    
    res.render('contact', { 
        title: 'Travlr Getaways',
        pageTitle: 'Contact',
        company: contactData.companyInfo,
        contact: contactData.contactDetails,
        hours: contactData.businessHours,
        social: contactData.socialMedia,
        departments: contactData.departments
    });
};

module.exports = {
    contact
};
