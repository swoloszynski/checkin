var twilio = require('twilio');
var client = new twilio.RestClient();

var SendText = {
  test: function(){
    return "test";
  },
  send: function() {
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
            return true;
        } else {
            console.log('Oops! There was an error.');
            return false;
        }
    });
  }

};

module.exports = SendText;
