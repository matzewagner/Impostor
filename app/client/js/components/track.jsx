import React, { Component } from 'react';
import InputForm from './inputForm.jsx';
import Player from './player.jsx';

const Track = (props) => {
  return (
    <div className="formClass">
      <InputForm {...props}/>
      <Player {...props}/>
    </div>
  );
};

export default Track;
