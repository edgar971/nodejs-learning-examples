var flight = require('./modules/flight'),
    conferenceFlight,
    vacationFlight;

conferenceFlight = flight({
    number: 443,
    origin: 'PDS',
    destination: 'NYC',
});

vacationFlight = flight({
    number: 890,
    origin: 'SLC',
    destination: 'GRB',
});

conferenceFlight.triggerDepart();

console.log(conferenceFlight.getInformation());

vacationFlight.triggerDepart()

console.log(vacationFlight.getInformation());
