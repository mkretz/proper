require('assert');
var restify = require('restify');
var server = require('../server.js');

before(function (done) {
    var db = require('./test-database');
    server.StartServer(db)
        .then(function (sequelize) {
            var Project = sequelize.model('project');
            var Version = sequelize.model('version');
            var Environment = sequelize.model('environment');
            Project.create({name: 'Test', description: 'Test'})
                .then(function (project) {
                    return Version.create({number: '3.0.1', description: 'Test', projectId: project.id});
                })
                .then(function (version) {
                    return Environment.create({name: 'int-lyra', description: "Test", projectId: version.projectId});
                })
                .then(function () {
                    done();
                });
        });
});

// http client
var client = restify.createJsonClient({
    version: '*',
    url: 'http://localhost:8080'
});

describe('the root endpoint', function() {
    it('should allow a GET', function (done) {
        client.get('/', function (err, req, res, data) {
            checkGetResponse(err,req,res,data,'invalid response from /');
            done();
        });
    });
});

describe('the project list endpoint', function() {
    it('should allow a GET', function (done) {
        client.get('/project', function (err, req, res, data) {
            checkGetResponse(err,req,res,data,'invalid response from /project');
            done();
        });
    });
});

describe('the project endpoint', function() {
    it('should allow a GET', function (done) {
        client.get('/project/1', function (err, req, res, data) {
            checkGetResponse(err,req,res,data,'invalid response from /project');
            done();
        });
    });
});

describe('the version list endpoint', function() {
    it('should allow a GET', function (done) {
        client.get('/project/1/version', function (err, req, res, data) {
            checkGetResponse(err,req,res,data,'invalid response from /project');
            done();
        });
    });
});

describe('the version endpoint', function() {
    it('should allow a GET', function (done) {
        client.get('/project/1/version/1', function (err, req, res, data) {
            checkGetResponse(err,req,res,data,'invalid response from /project');
            done();
        });
    });
});

describe('the environment list endpoint', function() {
    it('should allow a GET', function (done) {
        client.get('/project/1/environment', function (err, req, res, data) {
            checkGetResponse(err,req,res,data,'invalid response from /project');
            done();
        });
    });
});

describe('the environment endpoint', function() {
    it('should allow a GET', function (done) {
        client.get('/project/1/environment/1', function (err, req, res, data) {
            checkGetResponse(err,req,res,data,'invalid response from /project');
            done();
        });
    });
});

function checkGetResponse(err, req, res, data, errorMessage) {
    if (err) {
        throw new Error(err);
    }
    else {
        if (res.statusCode != 200) {
            throw new Error(errorMessage);
        }
        return data;
    }
}