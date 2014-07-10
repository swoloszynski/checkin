var twilio = require('twilio');
var client = new twilio.RestClient();
var TWILIO_NUMBER = process.env.TWILIO_NUM;

var SendText = {
  test: function(){
    return "test";
  },
  send: function(number) {
    client.sendSms({
      to: number,
      from: TWILIO_NUMBER,
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
