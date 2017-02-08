const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const freesound = require('./freesoundController');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.get('/freesound', freesound.authorize);

/**
 * /oauth-redirect is set as a redirect_uri on freesound.org
 * in the api key settings
 */
app.get('/oauth-redirect', (req, res, next) => {
  console.log('redirecting ...');
  freesound.setToken(req.query.code);
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
