var root = '/';
var projects = '/project';
var project = projects + '/:projectid'

function ProjectRoutes (server, Project) {
    var projectController = require('./project-controller')(server, Project);

    server.get({name : 'getentrypoint', path : root}, projectController.getEntrypoint);
    server.get({name : 'getprojects', path : projects}, projectController.getProjects);
    server.get({name : 'getproject', path : project}, projectController.getProject);
    server.put({name : 'updateproject', path : project}, projectController.updateProject);
    server.del({name : 'deleteproject', path : project}, projectController.deleteProject);
    server.post({name : 'createproject', path : projects}, projectController.createProject);

}

module.exports = ProjectRoutes;
