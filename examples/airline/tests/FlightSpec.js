var app = require('./helpers/app'),
    should = require('should'),
    supertest = require('supertest');

describe('flights', function(){
    it('should pass', function(done){
        done();
    });
    it('should not pass', function(done){
        throw "don't pass";
        done();
    });
})