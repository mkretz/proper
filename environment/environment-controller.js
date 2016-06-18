function EnvironmentController(server, ProjectController, Environment) {
    var utils = require('../utils')(server);
    var _ = require('lodash');
    return {
        getProject: function (req, res, next) {
            ProjectController.loadProject(req)
                .then(function (project) {
                        utils.addRequestData(req, 'project', project);
                        next();
                    },
                    function () {
                        res.send(404);
                    })
        },
        getEnvironments: function (req, res) {
            utils.getRequestData(req, 'project').getEnvironments()
                .then(function (environments) {
                    res.send(environments);
                })
        },
        getEnvironment: function (req, res) {
            utils.getRequestData(req, 'project').getEnvironments({ where: {id: req.params.environmentid } })
                .then(function (environment) {
                    if (environment.length > 0) {
                        res.send(environment[0]);
                    }
                    else {
                        res.send(404);
                    }

                })
        },
        createEnvironment: function (req, res) {
            utils.getRequestData(req, 'project').createEnvironment(req.body)
                .then(function (environment) {
                    var pathParams = {projectid: environment.projectId, environmentid: environment.id};
                    res.header('Location', server.router.render('getenvironment', pathParams));
                    res.send(204);
                });
        },
        updateEnvironment: function (req, res) {
            utils.getRequestData(req, 'project').getEnvironments({ where: {id: req.params.environmentid } })
                .then(function (environment) {
                    if (environment.length > 0) {
                        Environment.update(req.body, {
                            where: {
                                id: environment[0].id
                            }
                            })
                            .then(function () {
                                res.send(204);
                            });
                    }
                    else {
                        res.send(404);
                    }
                });
        },
        deleteEnvironment: function (req, res) {
            utils.getRequestData(req, 'project').getEnvironments({ where: {id: req.params.environmentid } })
                .then(function (environment) {
                    if (environment.length > 0) {
                        utils.getRequestData(req, 'project').removeEnvironment(environment)
                            .then(function () {
                                res.send(204);
                            });
                    }
                    else {
                        res.send(404);
                    }
                });
        }
    }

}

module.exports = EnvironmentController;