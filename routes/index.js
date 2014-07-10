var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var client = new twilio.RestClient();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

/* GET send text page. */
router.get('/sendtext', function(req, res) {
    client.sendSms({
	    to:'+17036257313',
	    from:'+17039917263',
	    body:'HI FROM SAM'
	}, function(error, message) {
	    if (!error) {
	        console.log('Success! The SID for this SMS message is:');
	        console.log(message.sid);

	        console.log('Message sent on:');
	        console.log(message.dateCreated);
	        res.render('sendtext', { result: true })
	    } else {
	        console.log('Oops! There was an error.');
	        res.render('sendtext', { result: false })
	    }
	});

});

module.exports = router;
