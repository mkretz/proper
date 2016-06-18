function ProjectRoutes (server, Project) {
    var paths = require('./project-paths');
    var projectController = require('./project-controller')(server, Project);

    server.get({name : 'getentrypoint', path : paths.root}, projectController.getEntrypoint);
    server.get({name : 'getprojects', path : paths.projects}, projectController.getProjects);
    server.get({name : 'getproject', path : paths.project}, projectController.getProject);
    server.put({name : 'updateproject', path : paths.project}, projectController.updateProject);
    server.del({name : 'deleteproject', path : paths.project}, projectController.deleteProject);
    server.post({name : 'createproject', path : paths.projects}, projectController.createProject);

}

module.exports = ProjectRoutes;
