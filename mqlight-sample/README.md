# IBM Cloud Hybrid Messaging Reference Implementation

## Solution Overview

This project provides an end-to-end reference implementation to demonstrate how to implement hybrid messaging that connects public cloud to on-prem systems via a secure messaging solution. It uses Bluemix Secure Gateway to communicate to MQ deployed on a SoftLayer VM image (to mimic on-prem deployment)

The project also provides a simple Node.js application that publishes and subscribes to the MQ topics via MQLite protocol. It is deployed to Bluemix as a Cloud Foundry application.

TO-DO: Add an solution overview diagram.

## Setup the MQ on SoftLayer

## Setup the Secure Gateway client on SoftLayer

1. FTP Secure Gateway Client installation package to /tmp directory
2. cd /tmp
3. rpm -ivhf <file-name>.rpm
4. Start the client (after defining the Secure Gateway on Bluemix):
   1. cd /opt/ibm/securegateway/client
   2. node lib/secgwclient.js <gateway-id> --t <security-token>
   3. acl allow :5672

## Run the app on Bluemix

1. Download and extract the code
2. cd into the app directory
3. cf push mqlight-sample
4. Create a Secure Gateway service, and define a gateway to connect to the
   remote MQ server, using:
   * The SoftLayer VM's IP address
   * Port 5672
   * A userid and password with access to the SoftLayer VM
5. Add the following environment variables to the sample app:
   * MQ_SERVER: The secure gateway’s cloud host
   * MQ_PORT: The secure gateway’s cloud port
   * MQ_USER: user
   * MQ_PASSWORD: password
6. Bind the Secure Gateway service to the CF app
