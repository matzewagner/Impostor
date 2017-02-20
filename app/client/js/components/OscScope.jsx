import React, { Component } from 'react';

const OscScope = (props) => {
  return (
    <div className="oscScope">
    my Oscilloscope
      <canvas class="myCanvas" width={50} height={30}></canvas>
    </div>
  )
};


export default OscScope;
