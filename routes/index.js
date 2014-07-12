var express = require('express');
var router = express.Router();
var SendText = require('../src/server/sendText.js');
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
		SendText.send(testNumber, req.params.message);
	}
	else {
  	SendText.send(testNumber);
	}
  res.render('sendtext')
});

module.exports = router;
