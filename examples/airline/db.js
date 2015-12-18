var mongoose = require('mongoose');

mongoose.connect('mongodb://flights:testing@ds033875.mongolab.com:33875/flights');

module.exports = mongoose.connection;