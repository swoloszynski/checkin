var express           = require('express');
var router            = express.Router();

var util              = require('util');
var sanitize          = require('html-css-sanitizer').sanitize;
var twilio            = require('twilio');

var Sms               = require('../src/server/Sms.js');
var database          = require('../src/server/database.js');


var testNumber        = process.env.MY_NUM;
var TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
var COLL_USER         = "user";

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

/* Connect to database and do simple insert */

router.get('/db', function(req, res) {
  var item = { name:"testItem", phone: "+17037037033" };
  database.insert(COLL_USER, item);
  res.render('helloworld', { title: 'DB' });
});

router.get('/database', function(req, res) {
  res.render('database');
});

router.post('/database', function(req, res) {
  req.checkBody('username', 'Empty message field').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    console.log(util.inspect(errors));
    var errorMessage = "Blank name field";
    res.render('database', { warning: errorMessage });
  }
  else {
    var username = sanitize(req.body.username);
    var user = {name: username};
    database.insert("user", user);
    var successMessage = "Inserted '" + username + "'";
    res.render('database', { message: successMessage });
  }
});

router.get('/display', function(req, res) {
  var collectionName = "user";
  database.get(collectionName, function(users) {
    console.log("users");
    console.log(users)
    var opts = { collectionName: collectionName, users: users };
    res.render('databaseDisplay', opts);
  });
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

router.post('/receivetext', function(req, res) {
  if (twilio.validateExpressRequest(req, TWILIO_AUTH_TOKEN)) {
    var response = "";
    var receivedMessage = {
      messageSid: req.body.MessageSid,
      accountSid: req.body.AcccountSid,
      from      : req.body.From,
      to        : req.body.To,
      body      : req.body.Body,
      numMedia  : req.body.NumMedia
    };
    database.insert(COLL_USER, receivedMessage);
    response = Sms.generateTwiml(testNumber, receivedMessage);
    res.writeHead(200, {
          'Content-Type':'text/xml'
    });
    console.log(receivedMessage.body);
    res.end(response);
  }
  else {
    res.render('unauthorized', {message: "Unauthorized request"});
  }
});

module.exports = router;
