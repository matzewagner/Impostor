const request = require('request');
const source = require('audio-source');

const clientID = 'swwwrpFUO3In7BtmIN6j';
const apiKey = 'ryowJnmxYqckzDz7DO3lbqKHhJMbUJiHubG030C5';
const baseURI = 'http://www.freesound.org/apiv2';
const options = '/sounds/8810';
const requestFreesoundAccessURI = `https://www.freesound.org/apiv2/oauth2/authorize/?client_id=swwwrpFUO3In7BtmIN6j&response_type=code`;
const requestAccessTokenURI = 'https://www.freesound.org/apiv2/oauth2/access_token/';
const query = `${baseURI}${options}`;

const context = null;
let auth;
let accessToken;
let data;
let src;

const freesoundController = {
  authorize: (req, res) => {
    console.log('redirecting ...');
    return res.redirect('https://www.stern.de');
  },
  setToken: (req, res, next) => {
    console.log('printing code from oAuth(): ', req.query.code);
    const tokenURI = `${requestAccessTokenURI}?client_id=${clientID}&client_secret=${apiKey}&grant_type=authorization_code&code=${req.query.code}`;

    request.post(tokenURI, (err, response, body) => {
      // console.log('getting access_token...', JSON.parse(body));
      accessToken = JSON.parse(body).access_token;
      next();
    });
  },
  getData: (req, res, next) => {
    // console.log('queryUrl: ', query);
    console.log('getting data ...');
    auth = `Bearer ${accessToken}`;
    request({ url: query, headers: { Authorization: auth } },
      (err, response, body) => {
        if (err) console.log('Error: ', err);
        data = JSON.parse(body);
        console.log('data: ', data);
        next();
      });
  },
  getSound: (req, res, next) => {
    const soundURI = data.previews['preview-hq-mp3'];
    // const soundURI = data.download;
    // src = new AudioSource({
    //   context: context,
    //   url: soundURI,
    // });

    // src.load(null, (err, src) => {
    //   if (err) console.log(err);
    //   console.log('source: ', src);
    // });

    // console.log('soundURI: ', soundURI);
    request({ url: soundURI, headers: { Authorization: auth } }, (err, res, body) => {
      if (err) console.log(err);
      let samples;
      // source(res).pipe(samples);
      // let chunk = read();
      // read.end();
      // console.log('are we getting samples? ', res);
    });
    next();
  },
};


module.exports = freesoundController;
