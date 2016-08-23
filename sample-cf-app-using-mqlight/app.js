/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

//
var mqlight = require('mqlight');
var mq_server = 'localhost';
var mq_port = '5672';
var mq_user = 'user';
var mq_password = 'password';
if(appEnv.isLocal == false) {
  mq_server = process.env.MQ_SERVER;
  mq_port = process.env.MQ_PORT;
  mq_user = process.env.MQ_USER;
  mq_password = process.env.MQ_PASSWORD;
}
var service = "amqp://" + mq_user + ":" + mq_password
                        + "@" + mq_server + ":" + mq_port;
var sendClient = mqlight.createClient({service: service});
var topic = 'public';
var data = 'Hello World!'

sendClient.on('error', function(error) {
    console.error('mqlight.createClient error');
    if (error) {
      if (error.message) console.error('message: %s', error.toString());
      else if (error.stack) console.error(error.stack);
      sendClient.stop();
    }
});

app.get('/', function(req, res, next) {
  if(sendClient.state == 'started') {
    console.log('Connected to %s', sendClient.service);
    console.log('Sending to: %s, data: %s', topic, data);
    sendClient.send(topic, data);
  }
  next();
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
  console.log('isLocal: %s', appEnv.isLocal);
});
