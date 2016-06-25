function EnvironmentRoutes (server, Project, Version) {
    var paths = require('./version-paths');
    var projectController = require('../project/project-controller')(server,Project);
    var versionController = require('./version-controller')(server, Version);
    server.get({name : 'getversions', path : paths.versions}, projectController.addProject, versionController.getVersions);
    server.get({name : 'getversion', path : paths.version}, projectController.addProject, versionController.getVersion);
    server.put({name : 'updateversion', path : paths.version}, projectController.addProject, versionController.updateVersion);
    server.del({name : 'deleteversion', path : paths.version}, projectController.addProject, versionController.deleteVersion);
    server.post({name : 'createversion', path : paths.versions}, projectController.addProject, versionController.createVersion);

}

module.exports = EnvironmentRoutes;