# IBM Cloud Hybrid Messaging Reference Implementation

## Solution Overview

This project provides end-to-end reference implemenation to demonstrate how to implement hybrid messaging that connects public cloud to on-prem system via secure messaging solution. It uses Bluemix Secure Gateway to communicate to MQ deployed on a SoftLayer VM image (mimick on-prem deployment)

The project also provides a simple Node.js application that publishes and subscribes to the MQ topics via MQLite protocal. It is deployed to Bluemix as a Cloud Foundry application. 

TO-DO: Add an solution overview diagram.

## Setup the MQ on SoftLayer

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
