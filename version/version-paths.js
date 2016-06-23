projectPaths = require('../project/project-paths');
var versions = projectPaths.project + '/version';
var version = versions + '/:versionid';

module.exports = {
    versions: versions,
    version: version
};
