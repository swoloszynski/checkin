## Twilio Set Up

**Phone number:** On the twilio account page, testing phone numbers must be verified.

**Environment variables:** Set *TWILIO\_ACCOUNT\_SID*, *TWILIO\_AUTH\_TOKEN*, *MY\_NUM*, and *TWILIO\_NUM* locally and on Heroku app settings.

## Run Locally

```foreman start```

or

```TWILIO_ACCOUNT_SID=123abc TWILIO_AUTH_TOKEN=123abc MY_NUM=+12345678910 TWILIO_NUM=+12345678911 foreman start```

[Runs on port 5000](http://localhost:5000/)

## Deployment

**Deploy to Heroku from command line:**

```git push heroku master```
