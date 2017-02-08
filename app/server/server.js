const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const freesound = require('./freesoundController');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.get('/check', (req, res, next) => {
  freesound.getData(req, res, next);
  // console.log('hi from server', res);
  // res.redirect('localhost:8080');
});

app.get('/redirect', (req, res, next) => {
  console.log('reached redirect', req.query);
  freesound.oAuth(req.query.code);
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
