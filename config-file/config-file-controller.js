function ConfigFileController(server, ConfigFile) {
    var utils = require('../utils')(server);
    var _ = require('lodash');
    var fs = require('fs');
    var mime = require('mime');

    var configFileAttributes = ['id', 'name', 'path', 'version', 'createdAt', 'updatedAt', 'deploymentId'];

    function addConfigFileLinks(configFile, reqParams) {
        utils.addLink(configFile, 'self', 'getconfigfile', reqParams);
        utils.addLink(configFile, 'deployment', 'getdeployment', reqParams);
        utils.addLink(configFile, 'data', 'getconfigfiledata', reqParams);
    }

    function loadConfigFile(req, attributes) {
        return utils.getRequestData(req, 'deployment').getConfigfiles({attributes: attributes, where: {id: req.params.configfileid } })
            .then(function (configfile) {
                if (configfile.length > 0) {
                    addConfigFileLinks(configfile[0].dataValues,req.params);
                    return configfile[0];
                }
                else {
                    return Promise.reject();
                }

            });
    }

    return {
        getConfigFile: function (req, res) {
            loadConfigFile(req, configFileAttributes)
                .then(function (configfile) {
                        res.send(configfile);
                    },
                    function () {
                        res.send(404);
                    });
        },
        getConfigFileData: function (req, res) {
            loadConfigFile(req)
                .then(function (configfile) {
                        res.setHeader('Content-disposition', 'attachment; filename=' + configfile.name);
                        res.setHeader('Content-type', 'application/octet-stream');
                        res.send(configfile.data);
                    },
                    function () {
                        res.send(404);
                    });
        },
        getConfigFiles: function (req, res) {
            utils.getRequestData(req, 'deployment').getConfigfiles({attributes: configFileAttributes})
                .then(function (configfiles) {
                    utils.addLinks(configfiles, addConfigFileLinks, req.params,'configfileid');
                    res.send(configfiles);
                })
        },
        createConfigFile: function (req, res) {
            if (req.files && req.files.configfile) {
                var configFileData = fs.readFileSync(req.files.configfile.path);
                var configFile = {
                    path: req.body.path,
                    name: req.files.configfile.name,
                    data: configFileData
                };
                utils.getRequestData(req, 'deployment').createConfigfile(configFile)
                    .then(function (configFile) {
                        var pathParams = req.params;
                        pathParams.configfileid = configFile.id;
                        res.header('Location', server.router.render('getconfigfile', pathParams));
                        res.send(204);
                    });

            }
            else {
                res.send(400, 'no config file sent');
            }

        },
        updateConfigFile: function (req, res) {
            loadConfigFile(req, configFileAttributes)
                .then(function (configFile) {
                    ConfigFile.update(req.body, {
                            where: {
                                id: configFile.id
                            }
                        })
                        .then(function () {
                            res.send(204);
                        });
                });

        },
        deleteConfigFile: function (req, res) {
            loadConfigFile(req, configFileAttributes)
                .then(function (configFile) {
                    return ConfigFile.destroy({where: {
                        id: configFile.id
                    }});
                })
                .then(function () {
                    res.send(204);
                });
        }
    }

}

module.exports = ConfigFileController;