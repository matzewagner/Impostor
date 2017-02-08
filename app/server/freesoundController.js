const request = require('request');


const baseUrl = 'http://www.freesound.org/apiv2';
const options = '/sounds/8810';
const redirectURI = 'localhost:3000/';
const apiKey = 'ryowJnmxYqckzDz7DO3lbqKHhJMbUJiHubG030C5';
const clientID = 'swwwrpFUO3In7BtmIN6j';
const query = `${baseUrl}${options}&token=${apiKey}`;

const freesoundController = {
  getData: (req, res, next) => {
    // console.log('queryUrl: ', query);
    // console.log('getting data ...');
    // const p1 = new Promise((resolve, reject) => {
    //   request(query, (err, response, body) => {
    //     if (err) console.log('Error: ', err);
    //     console.log('freesound response body: ', JSON.parse(body));
    //   });
    // });
    let oAuthUri = `https://www.freesound.org/apiv2/oauth2/authorize/?client_id=${clientID}&response_type=code`;
    res.redirect(oAuthUri);
  },
  oAuth: (code) => {
    console.log('printing code from oAuth(): ', code);
    const postUri = 'https://www.freesound.org/apiv2/oauth2/access_token/';
    // let clientId = 'swwwrpFUO3In7BtmIN6j';
    
    const url = `${postUri}?client_id=${clientID}&client_secret=${apiKey}&grant_type=authorization_code&code=${code}`;
    
    request.post(url, (err, res, body) => {
      console.log('getting response: ', body);
    });
  },
};


module.exports = freesoundController;
