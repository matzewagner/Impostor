import React, { Component } from 'react';
import Track from './track.jsx';

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
  };
  render() {
    return (
      <div className="trackClass">
        <Track inputHandle={this.inputHandle} />
      </div>
    );
  };
}

export default Mixer;