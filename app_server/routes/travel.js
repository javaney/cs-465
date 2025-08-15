var express = require('express');
var router = express.Router();
const controller = require('../controllers/travel');

router.get('/', controller.travel);

module.exports = router;
