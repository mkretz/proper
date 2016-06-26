function DeploymentRoutes (server, Project, Environment, Deployment) {
    var paths = require('./deployment-paths');
    var projectController = require('../project/project-controller')(server,Project);
    var environmentController = require('../environment/environment-controller')(server, Environment);
    var deploymentController = require('./deployment-controller')(server, Deployment);
    server.get({name : 'getdeployments', path : paths.deployments}, projectController.addProject, environmentController.addEnvironment, deploymentController.getDeployments);
    server.get({name : 'getdeployment', path : paths.deployment}, projectController.addProject, environmentController.addEnvironment, deploymentController.getDeployment);
    server.del({name : 'deletedeployment', path : paths.deployment}, projectController.addProject, environmentController.addEnvironment, deploymentController.deleteDeployment);
    server.post({name : 'createdeployment', path : paths.deployments}, projectController.addProject, environmentController.addEnvironment, deploymentController.createDeployment);
}

module.exports = DeploymentRoutes;