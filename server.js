function StartServer (db) {
    var restify = require('restify');
    var sequelize = db.connectToDatabase();
    var server = restify.createServer();
    var syncdb = require('./syncdb');
    server.use(restify.bodyParser());
    var Environment = require('./environment/environment-model')(sequelize);
    var Version = require('./version/version-model')(sequelize);
    var ConfigFile = require('./config-file/config-file-model')(sequelize);
    var Project = require('./project/project-model')(sequelize, Environment, Version);
    var Deployment = require('./deployment/deployment-model')(sequelize, Environment, Version, ConfigFile);
    return syncdb.syncModels(Environment, Version, Project, Deployment, ConfigFile)
        .then(function () {
            require('./project/project-routes')(server, Project);
            require('./environment/environment-routes')(server, Project, Environment);
            require('./version/version-routes')(server, Project, Version);
            require('./deployment/deployment-routes')(server, Project, Environment, Deployment);
            require('./config-file/config-file-routes')(server,Project, Environment, Deployment, ConfigFile)
            server.listen(8080, 'localhost', function () {
                console.log('server listening at localhost on port 8080');
            });
            return sequelize;
        });
}

module.exports = {
    StartServer: StartServer
};