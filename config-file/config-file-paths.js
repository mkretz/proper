var deploymentPaths = require('../deployment/deployment-paths');
var configfiles = deploymentPaths.deployment + '/configfile';
var configfile = configfiles + '/:configfileid';
var data = configfile + '/data';

module.exports = {
    configfiles: configfiles,
    configfile: configfile,
    data: data
};