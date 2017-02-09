import React, { Component } from 'react';
import Track from './track.jsx';
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
      numTracks: 0,
      query: null,
      counter: 0,
      activeSteps: {},
    };
    this.inputHandle = this.inputHandle.bind(this);
    this.playHandle = this.playHandle.bind(this);
    this.selectStepHandle = this.selectStepHandle.bind(this);
    this.triggerHandle = this.triggerHandle.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  };
  getInitialState() {

  };
  searchFreesound() {

  };
  addTrack() {
    this.setState({ numTracks: this.state.numTracks + 1});
  };
  removeTrack() {
    if (this.state.numTracks > 0) {
      this.setState({numTracks: this.state.numTracks - 1});
    } else { 
      this.setState({activeSteps: {}});
    }
  };
  inputHandle(e) {
    console.log('getting form data: ', e.target.elements.freesoundQuery.value);
    e.preventDefault();
    this.setState({query: e.target.value});
    this.freesoundQuery();
  };
  freesoundQuery() {
    const freesoundURI = 'http://localhost:3000/fs';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/fs');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {  };
    xhr.send();
  };
  incrementCounter() {
    this.setState({ counter: (this.state.counter + 1) % 16});
    // console.log('counter: ', this.state.counter);
  };
  selectStepHandle(stepKey) {
    // console.log('clicked', stepKey);
    let obj = this.state.activeSteps;
    if (obj.hasOwnProperty(stepKey)) {
      delete obj[stepKey];
    } else {
      obj[stepKey] = true;
    }
    // console.log(obj);
    this.setState({ activeSteps: obj });
  };
  componentWillMount() {
    let self = this;
    setInterval(function() {
      self.incrementCounter();
    }, 125);
  };
  triggerHandle(stepKey) {
    // console.log('trigger!!!');
    this.sound();
  };
  playHandle(e) {
      // url: 'http://www.freesound.org/data/previews/8/8810_2518-hq.mp3',
    // console.log('playing');
    this.sound();
    this.incrementCounter();
  };
  sound() {
    let osc = ctx.createOscillator();
    osc.frequency.value = 330;
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + .1);
  };
  render() {
    let tracks = [...Array(this.state.numTracks)].map((el, i) => {
        return <Track
                  className="trackWrapper"
                  key={i}
                  trackKey={i}
                  inputHandle={this.inputHandle}
                  playHandle={this.playHandle}
                  selectHandle={this.selectStepHandle}
                  trigHandle={this.triggerHandle}
                  count={this.state.counter}
                  steps={this.state.activeSteps}
                  />
      });

      return (
        <div>
          <h1><a href="#" className="plus" onClick={this.addTrack}> + </a><a href="#" className="plus" onClick={this.removeTrack}> -- </a></h1>
          <div className="trackClass">
            {tracks}
          </div>
        </div>
      );
  };
}

export default Mixer;