var FlightSchema = require('../schemas/flight');

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
        var number = req.params.number;
        if(typeof flights[number] !== 'undefined') {
            res.json(flights[number].getInformation());
        } else {
            res.status(404).json({status: 'error'});
        }

    });

    router.put('/api/flight/:number/arrived', function(req, res){
        var number = req.params.number;
        if(typeof flights[number] !== 'undefined') {
            flights[number].triggerArrive();
            var record = new FlightSchema(flights[number].getInformation());
            record.save(function(err){
                if(err) {
                    console.log(err);
                    res.status(500).json({status: 'error'});
                } else {
                    res.json({status: 'success'});
                }
            });

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

    router.get('/arrivals', function(req,res){
        FlightSchema.find()
            .setOptions({sort: 'actualArrive'})
            .exec(function(err, flights){
                if(!err) {
                    res.render('arrivals', {flights: flights});
                } else {

                }
            });
    });

    return router;
};
