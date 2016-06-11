function StartServer () {
    var restify = require('restify');

    var server = restify.createServer();
    require('./project/project-routes')(server);
    server.use(restify.bodyParser());
    server.listen(8080, 'localhost', function () {
        console.log('server listening at localhost on port 8080');
    });
}

module.exports = {
  StartServer: StartServer
};