import React, { Component } from 'react';
import Mixer from './mixer.jsx';

class App extends Component {
  render() {
    return (
      <div className="mixerClass">
        <h1>Reactor sort of working or not?</h1>
        <Mixer/>
      </div>
    );
  }
}

export default App;
