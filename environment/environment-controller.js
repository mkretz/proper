function EnvironmentController(server, Environment) {
    var utils = require('../utils')(server);
    var _ = require('lodash');
    var slug = require('slug');

    function addEnvironmentLinks(environment, reqParams) {
        utils.addLink(environment, 'self', 'getenvironment', reqParams);
        utils.addLink(environment, 'project', 'getproject', reqParams);
        utils.addLink(environment, 'deployments', 'getdeployments', reqParams);
    }

    function loadEnvironment(req) {
        return utils.getRequestData(req, 'project').getEnvironments({ where: {id: req.params.environmentid } })
            .then(function (environment) {
                if (environment.length > 0) {
                    addEnvironmentLinks(environment[0].dataValues,req.params);
                    return environment[0];
                }
                else {
                    return Promise.reject();
                }

            });
    }

    return {
        addEnvironment: function (req, res, next) {
            loadEnvironment(req)
                .then(function (env) {
                        utils.addRequestData(req, 'environment', env);
                        next();
                    },
                    function () {
                        res.send(404);
                    })
        },
        getEnvironments: function (req, res) {
            utils.getRequestData(req, 'project').getEnvironments()
                .then(function (environments) {
                    utils.addLinks(environments,addEnvironmentLinks,req.params,'environmentid');
                    res.send(environments);
                })
        },
        getEnvironment: function (req, res) {
            loadEnvironment(req)
                .then(function (environment) {
                    res.send(environment);
                },
                function () {
                    res.send(404);
                });
        },
        createEnvironment: function (req, res) {
            if (req.body.name) {
                req.body.name = slug(req.body.name);
                utils.getRequestData(req, 'project').createEnvironment(req.body)
                    .then(function (environment) {
                        var pathParams = {projectid: environment.projectId, environmentid: environment.id};
                        res.header('Location', server.router.render('getenvironment', pathParams));
                        res.send(204);
                    });
            }
            else {
                res.send(400);
            }
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