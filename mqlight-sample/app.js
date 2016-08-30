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

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

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
var my_service = "amqp://" + mq_user + ":" + mq_password
                        + "@" + mq_server + ":" + mq_port;

var mqlight = require('mqlight');
var sendClient = mqlight.createClient({service: my_service});
var topic = 'public';
sendClient.subscribe(topic);

sendClient.on('error', function(error) {
    console.error('mqlight.createClient error, service: %s',my_service);
    if (error) {
      if (error.message) console.error('message: %s', error.toString());
      else if (error.stack) console.error(error.stack);
      sendClient.stop();
    }
});

sendClient.on('message', function(data, delivery) {
  console.log('Received message: %s, topic: %s, ttl: %d', data
                                                        , delivery.message.topic
                                                        , delivery.message.ttl);
});

app.get('/', function(req, res, next) {
  if(sendClient.state == 'started') {
    var data = 'Hello World!'
    console.log('Sending to: %s, data: %s', topic, data);
    sendClient.send(topic, data);
  } else {
    console.log('Message not sent, sendClient.state: %s', sendClient.state);
  }
  next();
});

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log('server starting on ' + appEnv.url);
});
