function syncModels(Environment, Version, Project) {
    return Project.sync()
        .then(function () {
           return Environment.sync();
        })
        .then(function () {
            return Version.sync();
        });
}

module.exports = {
    syncModels: syncModels
};
