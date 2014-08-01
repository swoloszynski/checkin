var express           = require('express');
var router            = express.Router();

var util              = require('util');
var sanitize          = require('html-css-sanitizer').sanitize;
var twilio            = require('twilio');

var Sms               = require('../src/server/Sms.js');

var testNumber        = process.env.MY_NUM;
var TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

/* GET send text page. */
router.get('/sendtext/:message?', function(req, res) {
	if(req.params.message){
		Sms.send(testNumber, req.params.message);
	}
	else {
  	Sms.send(testNumber);
	}
  res.render('sendtext')
});

/* Form for sending text */

router.get('/sms', function(req, res) {
  res.render('sms');
});

router.post('/sms', function(req, res) {
  req.checkBody('message', 'Empty message field').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    console.log(util.inspect(errors));
    res.render('sms', { warning: "Invalid message" });
  }
  else {
    var message = sanitize(req.body.message);
    Sms.send(testNumber, message);
    res.render('sms', { message: message });
  }
});

router.get('/receivetext', function(req, res) {
  if (twilio.validateExpressRequest(req, TWILIO_AUTH_TOKEN)) {
    var response = "";
    response = Sms.generateTwiml(testNumber);
    res.writeHead(200, {
          'Content-Type':'text/xml'
      });

    var receivedMessage = {
      messageSid: req.params.MessageSid,
      accountSid: req.params.AcccountSid,
      from      : req.params.From,
      to        : req.params.To,
      body      : req.params.Body,
      numMedia  : req.params.NumMedia
    };

    console.log(receivedMessage.body);
    res.end(response);
  }
  else {
    res.render('unauthorized', {message: "Unauthorized request"});
  }
});

module.exports = router;
