# Node.js Starter Overview

The Node.js Starter demonstrates a simple, reusable Node.js web application based on the Express framework.

## Run the app locally

1. [Install Node.js][]
2. Download and extract the code
3. cd into the app directory
4. Run `npm install` to install the app's dependencies
5. Run `npm start` to start the app
6. Access the running app in a browser at http://localhost:6001

[Install Node.js]: https://nodejs.org/en/download/

## Run the app on Bluemix

1. Download and extract the code
2. cd into the app directory
3. cf push sample-cf-app-using-mqlight
4. Create a Secure Gateway service, and define a gateway to connect to the
   remote MQ server.
5. Add the following environment variables to the sample app:
    * MQ_SERVER: The secure gateway’s cloud host
    * MQ_PORT: The secure gateway’s cloud port
    * MQ_USER: user
    * MQ_PASSWORD: password
