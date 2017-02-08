import React, { Component } from 'react';

const Player = (props) => {
  return (
    <div className="playButton">
      <button type="reset" onClick={props.playHandle}>play</button>
    </div>
  );
};

export default Player;