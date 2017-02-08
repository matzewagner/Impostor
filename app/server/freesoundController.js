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
    next();
  },
  setToken: (code) => {
    console.log('printing code from oAuth(): ', code);
    const tokenURI = `${requestAccessTokenURI}?client_id=${clientID}&client_secret=${apiKey}&grant_type=authorization_code&code=${code}`;

    request.post(tokenURI, (err, res, body) => {
      console.log('getting access_token...', body);
      accessToken = body.access_token;
      getData();
    });
  },
  getData: () => {
    console.log('queryUrl: ', query);
    console.log('getting data ...');
    const p1 = new Promise((resolve, reject) => {
      request(query, (err, response, body) => {
        if (err) console.log('Error: ', err);
        console.log('freesound response body: ', JSON.parse(body));
      });
    });
  },
};


module.exports = freesoundController;
