import React, { Component } from 'react';
import InputForm from './inputForm.jsx';
import Player from './player.jsx';
import Sequencer from './sequencer.jsx';
import OscScope from './OscScope.jsx';

const Track = (props) => {
  return (
    <div>
      <InputForm className="formClass" {...props}/>
      <Player {...props}/>
      <Sequencer {...props}/>
      {/*<OscScope {...props}/>*/}
    </div>
  );
};

export default Track;
