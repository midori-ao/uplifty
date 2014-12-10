var expect = require('chai').expect;
var should = require('chai').should();
var request = require('request');
var nock = require('nock');
var mongoose = require('mongoose');
mongoose.connect('mongodb://alexzkazu:uplifty@ds047440.mongolab.com:47440/uplifty');

describe("Status API", function() {

	scope = nock('http://localhost:3000', {
	  reqheaders: {
	    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NDc1M2E4M2MzZWYxMzU5YjBmN2E2NmEiLCJpYXQiOjE0MTgwODQwOTEsImV4cCI6MTQxOTI5MzY5MSwicm9sZSI6ImFkbWluIn0.7XFhE90Gx50GayXl3aAmGzy5sZ1CtnToyaONJcnX-ME'
	  }
	})
	.get('/api/statuses')
	.reply(200);
 
	it("should connect to the statuses endpoint", function(done) {

		request({
			method: 'GET',
			uri: 'http://localhost:3000/api/statuses',
			headers: {
				'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NDc1M2E4M2MzZWYxMzU5YjBmN2E2NmEiLCJpYXQiOjE0MTgwODQwOTEsImV4cCI6MTQxOTI5MzY5MSwicm9sZSI6ImFkbWluIn0.7XFhE90Gx50GayXl3aAmGzy5sZ1CtnToyaONJcnX-ME'
			}
		}, function(err,res,body) {

			scope.done();
			console.log(body);
			(res.statusCode).should.equal(200);
			done();
		});

	});

});
