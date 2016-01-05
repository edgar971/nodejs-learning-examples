var FlightSchema = require('../schemas/flight'),
    Emitter = require('events').EventEmitter,
    flightEmitter = new Emitter();

//execute the code when the arrival event is emitted
flightEmitter.on('arrival', function(flight){
    var record = new FlightSchema(flight.getInformation());

    record.save(function(err){
        if(err) {
            console.log(err);
        }
    });
});

flightEmitter.on('arrival', function(flight){
   console.log('Flight arrived:' + flight);
});
module.exports = function(flightsData,passport){
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

            //Emit the arrival event
            flightEmitter.emit('arrival', flights[number]);

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

    router.get('/arrivals', function(req,res){
        FlightSchema.find()
            .setOptions({sort: 'actualArrive'})
            .exec(function(err, flights){
                if(!err) {
                    res.render('arrivals', {flights: flights})
                } else {

                }
            });
    });

    /*
     Login Stuff
     */
    router.get('/login', function(req,res){
        res.render('login');
    });
    router.post('/login', passport.authenticate('local',{
        failureRedirect: '/login',
        successRedirect: '/user'
    }));

    router.get('/user/', function(req,res){
        if(req.session.passport === undefined || req.session.passport.user === undefined) {
            res.redirect('/login');
        } else {
            res.render('user', {
                user: req.user,
                history: req.session.history
            });
        }
    });










    return router;
};
