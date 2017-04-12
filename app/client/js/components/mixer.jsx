import React, { Component } from 'react';
import Track from './track.jsx';
const AudioSource = require('audiosource');

const ctx = new AudioContext();
const analyzer = ctx.createAnalyser();

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
      numTracks: 1,
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
    this.sound(stepKey);
  };
  playHandle(e) {
      // url: 'http://www.freesound.org/data/previews/8/8810_2518-hq.mp3',
    // console.log('playing');
    this.sound();
    this.incrementCounter();
  };
  sound(stepKey) {
    let osc = ctx.createOscillator();
    let oscRand = ctx.createOscillator();
    let kick = ctx.createOscillator();
    let square = ctx.createOscillator();
    
    const duration = ctx.sampleRate * 0.05;
    const buf = ctx.createBuffer(1, duration, ctx.sampleRate);
    const fillBuf = buf.getChannelData(0);
    for (let i = 0; i < duration; i += 1) {
      fillBuf[i] = (Math.random() * 2) - 1;
    }
    const playBuf = ctx.createBufferSource();
    playBuf.buffer = buf;
    playBuf.loop = false;

    osc.frequency.value = 330;
    oscRand.frequency.value = Math.random() * 1000 + 50;
    kick.frequency.value = 63;
    square.frequency.value = Math.random() * 20 + 100; 
    square.type = 'square';

    osc.connect(ctx.destination);
    osc.connect(analyzer);
    oscRand.connect(ctx.destination);
    kick.connect(ctx.destination);
    square.connect(ctx.destination);
    playBuf.connect(ctx.destination);


    if (stepKey < 16) {
      osc.start();
      osc.stop(ctx.currentTime + .1);
    } else if (stepKey >= 16 && stepKey < 32) {
      oscRand.start();
      oscRand.stop(ctx.currentTime + .1);
    } else if (stepKey >= 32 && stepKey < 48) {
      kick.start();
      kick.stop(ctx.currentTime + .1);
    } else if (stepKey >= 48 && stepKey < 64) {
      playBuf.start();      
    } else if (stepKey >= 64 && stepKey < 80) {
      square.start();
      square.stop(ctx.currentTime + .15);
    }

    // let canvas = document.getElementsByClassName('myCanvas');
    // let canvctx = canvas.getContext('2d');
    // let dataArr = new Float32Array(analyzer.fftSize);
    // analyzer.getFloatTimeDomainData(dataArr);

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