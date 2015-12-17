var express = require('express'),
    router = express.Router(),
    flight = require('../../../custom_modules/flight'),
    flightsData = require('../data'),
    flights = {};


flightsData.forEach(function(item,index,array){
    flights[item.number] = flight.create(item);
});
router.get('/', function(req, res, next) {
  res.json(flightsData);
});

router.get('/flight/:number', function(req, res, next){
    var number = req.param('number');
    if(typeof flights[number] !== 'undefined') {
        res.json(flights[number].getInformation());
    } else {
        res.json({status: 'error'});
    }

});


module.exports = router;
