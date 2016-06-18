function EnvironmentRoutes (server, Project, Environment) {
    var paths = require('./environment-paths');
    var projectController = require('../project/project-controller')(server,Project);
    var environmentController = require('./environment-controller')(server, projectController, Environment);
    server.get({name : 'getenvironments', path : paths.environments}, environmentController.getProject, environmentController.getEnvironments);
    server.get({name : 'getenvironment', path : paths.environment}, environmentController.getProject, environmentController.getEnvironment);
    server.put({name : 'updateenvironment', path : paths.environment}, environmentController.getProject, environmentController.updateEnvironment);
    server.del({name : 'deleteenvironment', path : paths.environment}, environmentController.getProject, environmentController.deleteEnvironment);
    server.post({name : 'createenvironment', path : paths.environments}, environmentController.getProject, environmentController.createEnvironment);

}

module.exports = EnvironmentRoutes;