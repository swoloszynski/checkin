## Twilio Set Up

**Phone number:** On the twilio account page, testing phone numbers must be verified.

**Environment variables:** Set *TWILIO\_ACCOUNT\_SID*, *TWILIO\_AUTH\_TOKEN*, *MY\_NUM*, and *TWILIO\_NUM* locally and on Heroku app settings.

## Run Locally

**Start MongoDB, runs on default port 27017**

```mongod ```

**Start server, runs on [port 5000](http://localhost:5000/)**

```foreman start```

or

```TWILIO_ACCOUNT_SID=123abc TWILIO_AUTH_TOKEN=123abc MY_NUM=+12345678910 TWILIO_NUM=+12345678911 foreman start```

**MongoDB CMI**

```mongo ```

Diagnostics on [port 28017](http://localhost:28017/)

## Deployment

**Deploy to Heroku from command line:**

```git push heroku master```
