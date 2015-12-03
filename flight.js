var flight = require('./modules/flight');

flight.setDestination('NYC');
flight.setOrigin('ORD');
flight.setNumber(543);

console.log(flight.getInfo());