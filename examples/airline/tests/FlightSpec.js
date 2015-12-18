var app = require('./helpers/app'),
    should = require('should'),
    supertest = require('supertest');

describe('flights', function() {
    it('should return valid flight data for flight 765122', function (done) {
        supertest(app)
            .get('/api/flight/765122')
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });

    });

    it('should return invalid flight', function (done) {
        supertest(app)
            .get('/api/flight/76512222')
            .expect(404)
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });

    });

    it('should mark as arrived flight', function (done) {
        supertest(app)
            .put('/api/flight/765122/arrived')
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });

    });

    it('should mark as arrived flight on invalid flight', function (done) {
        supertest(app)
            .put('/api/flight/76512222/arrived')
            .expect(404)
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });

    });


});