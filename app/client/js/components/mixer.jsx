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
      query: null,
      counter: 0,
      activeSteps: {},
    };
    this.inputHandle = this.inputHandle.bind(this);
    this.playHandle = this.playHandle.bind(this);
    this.selectStepHandle = this.selectStepHandle.bind(this);
    this.triggerHandle = this.triggerHandle.bind(this);
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
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/fs');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => { console.log('check') };
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
  triggerHandle(stepKey) {
    console.log('trigger!!!');
    this.sound();
  };
  playHandle(e) {
      // url: 'http://www.freesound.org/data/previews/8/8810_2518-hq.mp3',
    console.log('playing');
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
    return (
      <div className="trackClass">
        <Track
          inputHandle={this.inputHandle}
          playHandle={this.playHandle}
          selectHandle={this.selectStepHandle}
          trigHandle={this.triggerHandle}
          count={this.state.counter}
          steps={this.state.activeSteps}
        />
      </div>
    );
  };
  componentWillMount() {
    let self = this;
    setInterval(function() {
      self.incrementCounter();
    }, 150);
  };
}

export default Mixer;