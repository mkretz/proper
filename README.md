# Proper
A tool for managing configuration properties over various environments and versions.
## Development environment
### Prerequisites
* Docker (for Mac see https://docs.docker.com/engine/installation/mac/#/docker-for-mac, for Windows see https://docs.docker.com/engine/installation/windows/#/docker-for-windows)
* Node

### Setup
1. Clone `https://github.com/mkretz/proper.git`
1. Run `npm install`. This will download all node dependencies.
1. Run `npm run setup:db`. This will set up MariaDB in a docker container
1. Run `npm start`. This will start the API. The database is created on the first startup.
1. Run `curl -X GET -H "Cache-Control: no-cache" "http://localhost:8080"`. If you receive the following response payload, the setup was successful
```json
{"name":"proper","version":"0.0.1","_links":[{"rel":"projects","href":"/project"}]}
```

### Unit tests
1. Shut down the Proper server (to avoid port conflicts)
1. Run `npm test` to execute the mocha unit tests.

### Database session
1. Run `npm run db:session` to get a root session on the database.
