var dream = require('dreamjs'),
    data;


data = dream.schema({
    number: /^([1-9]{6})$/,
    origin: 'state',
    destination: 'state',
    departs: 'hour',
    arrives: 'hour',

}).generateRnd(20).output();

module.exports = data;