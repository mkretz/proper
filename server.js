function StartServer () {
    var restify = require('restify');
    var db = require('./database');
    var sequelize = db.connectToDatabase();
    var server = restify.createServer();
    server.use(restify.bodyParser());
    var Environment = require('./environment/environment-model')(sequelize);
    var Version = require('./version/version-model')(sequelize);
    var Project = require('./project/project-model')(sequelize, Environment, Version);
    require('./project/project-routes')(server, Project);
    require('./environment/environment-routes')(server, Project, Environment);
    require('./version/version-routes')(server, Project, Version);
    server.listen(8080, 'localhost', function () {
        console.log('server listening at localhost on port 8080');
    });
}

module.exports = {
  StartServer: StartServer
};