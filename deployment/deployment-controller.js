/**
 * Created by taakrma0 on 26/06/16.
 */
function DeploymentController(server, Deployment) {
    var utils = require('../utils')(server);
    var _ = require('lodash');

    function addDeploymentLinks(deployment, reqParams) {
        utils.addLink(deployment, 'self', 'getdeployment', reqParams);
        utils.addLink(deployment, 'environment', 'getenvironment', reqParams);
        utils.addLink(deployment, 'version', 'getversion', _.extend(reqParams, {versionid: deployment.versionId}));
    }

    function loadDeployment(req) {
        return Deployment.findById(parseInt(req.params.deploymentid))
            .then(function (deployment) {
                if (deployment) {
                    addDeploymentLinks(deployment.dataValues,req.params);
                    return deployment;
                }
                else {
                    return Promise.reject();
                }

            });
    }

    return {
        getDeployments: function (req, res) {
            Deployment.findAll({ where: { environmentId: utils.getRequestData(req, 'environment').id } })
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
                        Deployment.create({environmentId: req.params.environmentid, versionId: versions[0].id, status: "planned"})
                            .then(function (deployment) {
                                utils.getRequestData(req, 'environment').addVersion(versions[0], {status: req.body.status})
                                    .then(function () {
                                        var pathParams = {projectid: utils.getRequestData(req,'environment').projectId,
                                            environmentid: deployment.environmentId,
                                            deploymentid: deployment.id};
                                        res.header('Location', server.router.render('getdeployment', pathParams));
                                        res.send(204);
                                    });
                            });
                    }
                    else {
                        res.send(400);
                    }
                });
        },
        deleteDeployment: function (req, res) {
            Deployment.findById(parseInt(req.params.deploymentid))
                .then(function (deployment) {
                    if (deployment) {
                        Deployment.destroy({ where: {id: req.params.deploymentid}})
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