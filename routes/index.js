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
  res.render('index', { title: 'Checkin' });
});

/* Form to insert into database */
router.get('/database', function(req, res) {
  res.render('database');
});

router.post('/database', function(req, res) {
  req.checkBody('Body', 'Empty message body field').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    console.log(util.inspect(errors));
    var errorMessage = "Blank message body field";
    res.render('database', { warning: errorMessage });
  }
  else {
    var messageSid = sanitize(req.body.MessageSid);
    var acccountSid = sanitize(req.body.AcccountSid);
    var from = sanitize(req.body.From);
    var to = sanitize(req.body.To);
    var body = sanitize(req.body.Body);
    var numMedia = sanitize(req.body.NumMedia);

    var receivedMessage = {
      messageSid: messageSid,
      accountSid: acccountSid,
      from      : from,
      to        : to,
      body      : body,
      numMedia  : numMedia
    };

    database.insert("user", receivedMessage);
    var successMessage = "Inserted '" + body + "'";
    res.render('database', { message: successMessage });
  }
});

/* Display database contents */
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

/* Receive text via POST from Twilio,
 * generate Twiml to echo message in response text,
 * and insert received message into database. */
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
