function EnvironmentRoutes (server, Project, Version) {
    var paths = require('./version-paths');
    var projectController = require('../project/project-controller')(server,Project);
    var versionController = require('./version-controller')(server, projectController, Version);
    server.get({name : 'getversions', path : paths.versions}, versionController.getProject, versionController.getVersions);
    server.get({name : 'getversion', path : paths.version}, versionController.getProject, versionController.getVersion);
    server.put({name : 'updateversion', path : paths.version}, versionController.getProject, versionController.updateVersion);
    server.del({name : 'deleteversion', path : paths.version}, versionController.getProject, versionController.deleteVersion);
    server.post({name : 'createversion', path : paths.versions}, versionController.getProject, versionController.createVersion);

}

module.exports = EnvironmentRoutes;