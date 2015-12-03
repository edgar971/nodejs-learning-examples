var flight = require('../../custom_modules/flight'),
    conferenceFlight,
    vacationFlight;

//Create Flights
conferenceFlight = flight.create({
    number: 443,
    origin: 'PDS',
    destination: 'NYC',
});

vacationFlight = flight.create({
    number: 890,
    origin: 'SLC',
    destination: 'GRB',
});

//Trigger Depart
conferenceFlight.triggerDepart();
vacationFlight.triggerDepart()

//Output number of flights
console.log(flight.getTotal());

//output all flights
console.log(flight.getFlights());