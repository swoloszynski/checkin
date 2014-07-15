var twilio = require('twilio');
var client = new twilio.RestClient();
var TWILIO_NUMBER = process.env.TWILIO_NUM;
var DEFAULT_MESSAGE = "Hi from Sam's app! (default)";

var Sms = {
  send: function(number, message) {
    var body = DEFAULT_MESSAGE;
    if(message) {
      body = message;
    }
    client.sendSms({
      to: number,
      from: TWILIO_NUMBER,
      body: body
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
  },

  generateTwiml: function(number) {
    var body = DEFAULT_MESSAGE;
    var resp = new twilio.TwimlResponse();
    resp.sms({to: number, from: TWILIO_NUMBER}, body);
    return resp.toString();
  }

};

module.exports = Sms;
