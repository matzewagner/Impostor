const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const freesound = require('./freesoundController');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log('check');
  next();
});

app.get('/fs', freesound.authorize);

/**
 * /oauth-redirect is set as a redirect_uri on freesound.org
 * in the api key settings
 */
app.get('/oauth-redirect', freesound.setToken, freesound.getData, freesound.getSound);

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
