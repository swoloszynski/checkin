var express = require('express');
var router = express.Router();
var SendText = require('../src/server/sendText.js');

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
  SendText.send();
  res.render('sendtext')
});

module.exports = router;
