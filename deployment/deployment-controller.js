/**
 * Created by taakrma0 on 26/06/16.
 */
function DeploymentController(server, Deployment) {
    var utils = require('../utils')(server);
    var _ = require('lodash');

    function addDeploymentLinks(deployment, reqParams) {

    }

    function loadDeployment(req) {
        return utils.getRequestData(req, 'environment').getVersions({ where: {id: req.params.deploymentid } })
            .then(function (deployment) {
                if (deployment.length > 0) {
                    addDeploymentLinks(deployment[0].dataValues,req.params);
                    return deployment[0];
                }
                else {
                    return Promise.reject();
                }

            });
    }

    return {
        getDeployments: function (req, res) {
            utils.getRequestData(req, 'environment').getVersions()
                .then(function (deployments) {
                    utils.addLinks(deployments, addDeploymentLinks, req.params,'deploymentid');
                    res.send(deployments);
                })
        },
        getDeployment: function (req, res) {
            loadDeployment(req)
                .then(function (deployment) {
                        res.send(deployment);
                    },
                    function () {
                        res.send(404);
                    });
        },
        createDeployment: function (req, res) {
            utils.getRequestData(req, 'project').getVersions({ where: {id: req.body.versionId}})
                .then(function (versions) {
                    if (versions.length > 0) {
                        utils.getRequestData(req, 'environment').addVersion(versions[0], {status: req.body.status})
                            .then(function (deployment) {
                                var pathParams = {projectid: utils.getRequestData(req,'environment').projectId,
                                    environmentid: deployment.environmentId,
                                    deploymentid: deployment.id};
                                res.header('Location', server.router.render('getdeployment', pathParams));
                                res.send(204);
                            });
                    }
                    else {
                        res.send(400);
                    }
                });
        },
        deleteDeployment: function (req, res) {
            utils.getRequestData(req, 'environment').getVersions({ where: {id: req.params.deploymentid } })
                .then(function (deployments) {
                    if (deployments.length > 0) {
                        utils.getRequestData(req, 'environment').removeVersion(deployments)
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

module.exports = DeploymentController;