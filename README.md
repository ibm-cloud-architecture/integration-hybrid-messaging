# IBM Cloud Hybrid Messaging Reference Implementation

## Solution Overview

This project provides an end-to-end reference implementation to demonstrate how to implement hybrid messaging that connects public cloud to on-prem systems via a secure messaging solution. It uses Bluemix Secure Gateway to communicate to MQ deployed on a SoftLayer VM image (to mimic on-prem deployment)

The project also provides a simple Node.js application that publishes and subscribes to the MQ topics via MQLite protocol. It is deployed to Bluemix as a Cloud Foundry application.

TO-DO: Add an solution overview diagram.

## Setup the MQ on SoftLayer

Install a version of MQ on the SoftLayer VM that supports AMQP.
Create and start a Queue Manager.
Create and start the AMQP service.

More information here https://www.ibm.com/support/knowledgecenter/SSFKSJ_8.0.0/com.ibm.mq.ins.doc/q008250_.htm

## Setup a Secure Gateway service on Bluemix

1. From the Bluemix Catalog, select Secure Gateway
2. Click CREATE
3. ADD GATEWAY
4. Name GatewayToLocalMQ
5. Add a destination, named OnPremMQ
   * On-premises
   * SoftLayer VM's IP address
   * Port 5672
   * Using TCP

## Setup the Secure Gateway client on SoftLayer

1. FTP Secure Gateway Client installation package to /tmp directory
2. cd /tmp
3. rpm -ivhf [file-name].rpm
4. Start the client (after defining the Secure Gateway on Bluemix):
   1. cd /opt/ibm/securegateway/client
   2. node lib/secgwclient.js [gateway-id] --t [security-token]
   3. acl allow :5672
5. After the Secure gateway client is started, the Secure Gateway on Bluemix will show as connected.

## Run the app on Bluemix

1. Download and extract the code
2. cd into the app directory
3. cf push mqlight-sample
4. Add the following environment variables to the sample app:
   * MQ_SERVER: The secure gateway’s cloud host
   * MQ_PORT: The secure gateway’s cloud port
   * MQ_USER: A VM userid
   * MQ_PASSWORD: The associated VM password
5. Bind the Secure Gateway service to the CF app
