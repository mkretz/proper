function EnvironmentRoutes (server, Project, Environment) {
    var paths = require('./environment-paths');
    var projectController = require('../project/project-controller')(server,Project);
    var environmentController = require('./environment-controller')(server, Environment);
    server.get({name : 'getenvironments', path : paths.environments}, projectController.addProject, environmentController.getEnvironments);
    server.get({name : 'getenvironment', path : paths.environment}, projectController.addProject, environmentController.getEnvironment);
    server.put({name : 'updateenvironment', path : paths.environment}, projectController.addProject, environmentController.updateEnvironment);
    server.del({name : 'deleteenvironment', path : paths.environment}, projectController.addProject, environmentController.deleteEnvironment);
    server.post({name : 'createenvironment', path : paths.environments}, projectController.addProject, environmentController.createEnvironment);

}

module.exports = EnvironmentRoutes;