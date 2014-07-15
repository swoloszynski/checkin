var express = require('express');
var router = express.Router();
var Sms = require('../src/server/Sms.js');
var testNumber = process.env.MY_NUM;

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

router.get('/receivetext', function(req, res) {
  var response = "";
  response = Sms.generateTwiml(testNumber);
  res.writeHead(200, {
        'Content-Type':'text/xml'
    });
  res.end(response);
});

module.exports = router;
