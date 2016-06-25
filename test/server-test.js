require('assert');
var restify = require('restify');
var server = require('../server.js');
var _ = require('lodash');

function setupTestFixture(sequelize, done) {
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
}

before(function (done) {
    var db = require('./test-database');
    server.StartServer(db)
        .then(function (sequelize) {
            setupTestFixture(sequelize, done);
        });
});

// http client
var client = restify.createJsonClient({
    version: '*',
    url: 'http://localhost:8080'
});

describe('the root endpoint', function() {
    var root;

    it('should allow a GET', function (done) {
        client.get('/', function (err, req, res, data) {
            root = checkGetResponse(err,req,res,data,'invalid response from /');
            done();
        });
    });

    it('should link to projects', function (done) {
        checkLinkPresent(root, 'projects', 'expected projects link to be present');
        done();
    });
});

describe('the project list endpoint', function() {
    var projectList;
    it('should allow a GET', function (done) {
        client.get('/project', function (err, req, res, data) {
            projectList = checkGetResponse(err,req,res,data,'invalid response from /project');
            done();
        });
    });

    it('should return one project', function (done) {
        checkArrayLength(projectList, 1);
        done();
    });
});

describe('the project endpoint', function() {
    var project;
    it('should allow a GET', function (done) {
        client.get('/project/1', function (err, req, res, data) {
            project = checkGetResponse(err,req,res,data,'invalid response from /project');
            done();
        });
    });

    it('should link to versions, environments and itself', function (done) {
        checkLinkPresent(project, 'versions', 'expected versions link to be present');
        checkLinkPresent(project, 'environments', 'expected environments link to be present');
        checkLinkPresent(project, 'self', 'expected self link to be present');
        done();
    });
});

describe('the version list endpoint', function() {
    var versionList;
    it('should allow a GET', function (done) {
        client.get('/project/1/version', function (err, req, res, data) {
             versionList = checkGetResponse(err,req,res,data,'invalid response from /project');
            checkArrayLength(versionList, 1);
            done();
        });
    });

    it('should return one version', function (done) {
        checkArrayLength(versionList, 1);
        done();
    });
});

describe('the version endpoint', function() {
    var version;
    it('should allow a GET', function (done) {
        client.get('/project/1/version/1', function (err, req, res, data) {
            version = checkGetResponse(err,req,res,data,'invalid response from /project');
            done();
        });
    });

    it('should link to project and itself', function (done) {
        checkLinkPresent(version, 'self', 'expected self link to be present');
        checkLinkPresent(version, 'project', 'expected project link to be present');
        done();
    });
});

describe('the environment list endpoint', function() {
    var envList;
    it('should allow a GET', function (done) {
        client.get('/project/1/environment', function (err, req, res, data) {
            envList = checkGetResponse(err,req,res,data,'invalid response from /project');
            checkArrayLength(envList, 1);
            done();
        });
    });

    it('should return one environment', function (done) {
        checkArrayLength(envList, 1);
        done();
    });

});

describe('the environment endpoint', function() {
    var env;
    it('should allow a GET', function (done) {
        client.get('/project/1/environment/1', function (err, req, res, data) {
            env = checkGetResponse(err,req,res,data,'invalid response from /project');
            checkLinkPresent(env, 'self', 'expected self link to be present');
            checkLinkPresent(env, 'project', 'expected project link to be present');
            done();
        });
    });

    it('should link to project and itself', function (done) {
        checkLinkPresent(env, 'self', 'expected self link to be present');
        checkLinkPresent(env, 'project', 'expected project link to be present');
        done();
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

function getLink(dataObject, relName) {
    var result = undefined;
    var links = dataObject._links;
    if (!_.isUndefined(links)) {
        var link = _.find(links, {rel : relName});
        result = link.href;
    }
    return result;
}

function checkLinkPresent(dataObject, relName, errorMessage) {
    var result  = getLink(dataObject,relName);
    if (_.isUndefined(result)) {
        throw new Error(errorMessage);
    }
    return result;
}

function checkArrayLength(array, expectedLength) {
    if (array.length != expectedLength) {
        throw new Error('expecting ' + expectedLength + ' elements, got ' + array.length);
    }
}