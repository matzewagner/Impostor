import React, { Component } from 'react';
import Track from './track.jsx';

class Mixer extends Component {
  constructor() {
    super();
    this.state = {

    };
  };
  render() {
    return (
      <div className="trackClass">
        <Track/>
      </div>
    );
  }
}

export default Mixer;