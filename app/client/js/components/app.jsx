import React, { Component } from 'react';
import Mixer from './mixer.jsx';

class App extends Component {
  render() {
    return (
      <div className="mixerClass">
        <h1 className="title">impostor</h1>
        <Mixer />
      </div>
    );
  }
}

export default App;
