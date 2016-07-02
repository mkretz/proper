function ConfigFileRoutes (server, Project, Environment, Deployment, ConfigFile) {
    var restify = require('restify');
    var paths = require('./config-file-paths');
    var projectController = require('../project/project-controller')(server,Project);
    var environmentController = require('../environment/environment-controller')(server, Environment);
    var deploymentController = require('../deployment/deployment-controller')(server, Deployment);
    var configFileController = require('./config-file-controller')(server, ConfigFile);
    server.get({name : 'getconfigfiles', path : paths.configfiles}, projectController.addProject, environmentController.addEnvironment, deploymentController.addDeployment, configFileController.getConfigFiles);
    server.get({name : 'getconfigfile', path : paths.configfile}, projectController.addProject, environmentController.addEnvironment, deploymentController.addDeployment, configFileController.getConfigFile);
    server.get({name : 'getconfigfiledata', path : paths.data}, projectController.addProject, environmentController.addEnvironment, deploymentController.addDeployment, configFileController.getConfigFileData);
    server.del({name : 'deleteconfigfile', path : paths.configfile}, projectController.addProject, environmentController.addEnvironment, deploymentController.addDeployment, configFileController.deleteConfigFile);
    server.post({name : 'createconfigfile', path : paths.configfiles}, projectController.addProject, environmentController.addEnvironment, deploymentController.addDeployment, configFileController.createConfigFile);
    server.put({name : 'updateconfigfile', path : paths.configfile}, projectController.addProject, environmentController.addEnvironment, deploymentController.addDeployment, configFileController.updateConfigFile);
}

module.exports = ConfigFileRoutes;