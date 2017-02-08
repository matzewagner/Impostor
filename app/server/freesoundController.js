const request = require('request');

const clientID = 'swwwrpFUO3In7BtmIN6j';
const apiKey = 'ryowJnmxYqckzDz7DO3lbqKHhJMbUJiHubG030C5';
const baseUrl = 'http://www.freesound.org/apiv2';
const options = '/sounds/8810';
const requestFreesoundAccessURI = `https://www.freesound.org/apiv2/oauth2/authorize/?client_id=${clientID}&response_type=code`;
const requestAccessTokenURI = 'https://www.freesound.org/apiv2/oauth2/access_token/';    
const query = `${baseUrl}${options}&token=${apiKey}`;
let accessToken;

const freesoundController = {
  authorize: (req, res, next) => {
    res.redirect(requestFreesoundAccessURI);
    console.log('redirecting ...');
    next();
  },
  setToken: (req, res, next) => {
    console.log('printing code from oAuth(): ', req.query.code);
    const tokenURI = `${requestAccessTokenURI}?client_id=${clientID}&client_secret=${apiKey}&grant_type=authorization_code&code=${req.query.code}`;

    request.post(tokenURI, (err, res, body) => {
      console.log('getting access_token...', body);
      accessToken = body.access_token;
      next();
    });
  },
  getData: (req, res, next) => {
    console.log('queryUrl: ', query);
    console.log('getting data ...');
    const p1 = new Promise((resolve, reject) => {
      request(query, (err, response, body) => {
        if (err) console.log('Error: ', err);
        console.log('freesound response body: ', JSON.parse(body));
      });
    });
    next();
  },
};


module.exports = freesoundController;
