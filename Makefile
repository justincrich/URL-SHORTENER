.PHONY: $(MAKECMDGOALS)

# `make setup` will be used after cloning or downloading to fulfill
# dependencies, and setup the the project in an initial state.
# This is where you might download rubygems, node_modules, packages,
# compile code, build container images, initialize a database,
# anything else that needs to happen before your server is started
# for the first time
setup:
	yarn install
# `make server` will be used after `make setup` in order to start
# an http server process that listens on any unreserved port
#	of your choice (e.g. 8080). 
server:
	echo "starting server on port 5000"
	yarn dev-server
client:
	echo "starting server on port 3000"
	yarn start-client
start:
	echo "starting clinet on port 3000 and server on port 5000"
	yarn start
# `make test` will be used after `make setup` in order to run
# your test suite.
test:
	yarn test-server 