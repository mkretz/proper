function VersionController(server, Version) {
    var utils = require('../utils')(server);
    var _ = require('lodash');

    function addVersionLinks(version, reqParams) {
        utils.addLink(version, 'self', 'getversion', reqParams);
        utils.addLink(version, 'project', 'getproject', reqParams);
    }

    return {
        getVersions: function (req, res) {
            utils.getRequestData(req, 'project').getVersions()
                .then(function (version) {
                    utils.addLinks(version,addVersionLinks,req.params,'versionid');
                    res.send(version);
                })
        },
        getVersion: function (req, res) {
            utils.getRequestData(req, 'project').getVersions({ where: {id: req.params.versionid } })
                .then(function (version) {
                    if (version.length > 0) {
                        addVersionLinks(version[0].dataValues,req.params);
                        res.send(version[0]);
                    }
                    else {
                        res.send(404);
                    }

                })
        },
        createVersion: function (req, res) {
            if (req.body.number) {
                utils.getRequestData(req, 'project').createVersion(req.body)
                    .then(function (version) {
                        var pathParams = {projectid: version.projectId, versionid: version.id};
                        res.header('Location', server.router.render('getversion', pathParams));
                        res.send(204);
                    });
            }
            else {
                res.send(400);
            }
        },
        updateVersion: function (req, res) {
            utils.getRequestData(req, 'project').getVersions({ where: {id: req.params.versionid } })
                .then(function (version) {
                    if (version.length > 0) {
                        Version.update(req.body, {
                                where: {
                                    id: version[0].id
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
        deleteVersion: function (req, res) {
            utils.getRequestData(req, 'project').getVersions({ where: {id: req.params.versionid } })
                .then(function (version) {
                    if (version.length > 0) {
                        utils.getRequestData(req, 'project').removeVersion(version)
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

module.exports = VersionController;