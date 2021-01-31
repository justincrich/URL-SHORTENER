# URL Shortener
A challenge to create a fullstack solution that shortens URLs

## Getting started
1. install dependencies: `yarn install`
2. boot server and client: `yarn start`
    - note: this will kick off the building and local hosting of both the react client and its services

## Using the application
- **web client**: The user may interact with the web client via `http://localhost:3000`
- **server**: the server is run on `http://localhost:5000`. 
- The client accesses the server via proxy which is handled by the `react-scripts` library.

## Tests
- all server test cases are run via the command `yarn test-server`
- server unit tests are written in [Jest]('https://jestjs.io/en/') 
- test coverage includes logic for url string shortening and storage/retrieval

## Key Dependencies
This application relies on the following libraries to run:
- Typescript: type checks/compiles code
- Jest: test runner 
- nodemon: manages development rebuild process for the server
- concurrently: manages execution of both client and server scripting
- react/redux/react-scripts: web client tooling & frameworks
- styled-components: css in js library
- react-hook-form: manages basic form state
- express: manages server request routing