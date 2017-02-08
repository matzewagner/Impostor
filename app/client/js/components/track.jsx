import React, { Component } from 'react';
import InputForm from './inputForm.jsx';
import Player from './player.jsx';
import Sequencer from './sequencer.jsx';

const Track = (props) => {
  return (
    <div>
      <InputForm className="formClass" {...props}/>
      <Sequencer {...props}/>
      <Player {...props}/>
    </div>
  );
};

export default Track;
