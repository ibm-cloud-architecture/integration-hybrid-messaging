# Node.js Starter Overview

The Node.js Starter demonstrates a simple, reusable Node.js web application based on the Express framework.

## Run the app locally

1. [Install Node.js][]
2. Download and extract the starter code from the Bluemix UI
3. cd into the app directory
4. Run `npm install` to install the app's dependencies
5. Run `npm start` to start the app
6. Access the running app in a browser at http://localhost:6001

[Install Node.js]: https://nodejs.org/en/download/

## Run the app on Bluemix

1. cf push sample-cf-app-using-mqlight

   Add the following environment variables to the app:
      MQ_SERVER: The secure gateway’s cloud host
      MQ_PORT: The secure gateway’s cloud port
      MQ_USER: user
      MQ_PASSWORD: password
