var express = require('express'),
    router = express.Router(),
    flight = require('../../../custom_modules/flight'),
    flights = require('../data/index.js');

for(var number in flights) {
    flights[number] = flight.create(flights[number]);
}


router.get('/', function(req, res, next) {
  res.json(flights);
});

router.get('/flight/:number', function(req, res, next){
    var number = req.param('number');
    res.json(flights[number].getInformation());
});


module.exports = router;
