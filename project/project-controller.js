var packageJson = require('../package.json');

function ProjectController(server) {
     return {
         getEntrypoint : function (req, res) {
             var entrypoint = {
                 name : packageJson.name,
                 version : packageJson.version
             };
             res.send(entrypoint);
         }
     }
 }

module.exports = ProjectController;
