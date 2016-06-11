var root = '/';

function ProjectRoutes (server) {
    var projectController = require('./project-controller')(server);

    server.get({name : 'getentrypoint', path : root}, projectController.getEntrypoint);

}

module.exports = ProjectRoutes;
