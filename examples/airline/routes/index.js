
module.exports = function(flightsData){
    var express = require('express'),
        router = express.Router(),
        flight = require('../../../custom_modules/flight'),
        flights = {};


    flightsData.forEach(function(item,index,array){
        flights[item.number] = flight.create(item);
    });


    /**
     * API
     */
    router.get('/api/', function(req, res, next) {
        res.json(flightsData);
    });

    router.get('/api/flight/:number', function(req, res, next){
        var number = req.param('number');
        if(typeof flights[number] !== 'undefined') {
            res.json(flights[number].getInformation());
        } else {
            res.status(404).json({status: 'error'});
        }

    });

    router.put('/api/flight/:number/arrived', function(req, res){
        var number = req.param('number');
        if(typeof flights[number] !== 'undefined') {
            flights[number].triggerArrive();
            res.json({status: 'success'});

        } else {
            res.status(404).json({status: 'error'});
        }
    });

    /**
     * HTML Rendering
     */
    router.get('/', function(req,res){
        res.render('index', {flights: flightsData});
    });

    return router;
};
