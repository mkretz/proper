function syncModels(Environment, Version, Project, Deployment, ConfigFile) {
    return Project.sync()
        .then(function () {
           return Environment.sync();
        })
        .then(function () {
            return Version.sync();
        })
        .then(function () {
            return Deployment.sync();
        })
        .then(function () {
            return ConfigFile.sync();
        });
}

module.exports = {
    syncModels: syncModels
};
