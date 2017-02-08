import React, { Component } from 'react';
import Track from './track.jsx';
import axios from 'axios';
const AudioSource = require('audiosource');

const ctx = new AudioContext();

const clientID = 'swwwrpFUO3In7BtmIN6j';
const apiKey = 'ryowJnmxYqckzDz7DO3lbqKHhJMbUJiHubG030C5';
const baseURI = 'http://www.freesound.org/apiv2';
const options = '/sounds/8810';
const requestFreesoundAccessURI = `https://www.freesound.org/apiv2/oauth2/authorize/?client_id=${clientID}&response_type=code`;
const requestAccessTokenURI = 'https://www.freesound.org/apiv2/oauth2/access_token/';
const query = `${baseURI}${options}`;

class Mixer extends Component {
  constructor() {
    super();
    this.state = {
      query: null,
    };
    this.inputHandle = this.inputHandle.bind(this);
  };
  getInitialState() {

  };
  searchFreesound() {

  };
  inputHandle(e) {
    console.log('getting form data: ', e.target.elements.freesoundQuery.value);
    e.preventDefault();
    this.setState({query: e.target.value});
    this.freesoundQuery();
  };
  freesoundQuery() {
    const freesoundURI = 'http://localhost:3000/fs';
    axios.get(requestAccessTokenURI)
    .then((response) => {
      console.log('data: ', response.data);
      redirectData = response.data;
    });
  };
  playHandle(e) {
      // url: 'http://www.freesound.org/data/previews/8/8810_2518-hq.mp3',
    console.log('playing');
    let osc = ctx.createOscillator();
    osc.frequency.value = 330;

    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 2);
    
  };
  render() {
    return (
      <div className="trackClass">
        <Track inputHandle={this.inputHandle} playHandle={this.playHandle}/>
      </div>
    );
  };
}

export default Mixer;