import React, { Component } from 'react';
import Step from './step.jsx';

const Sequencer = (props) => {
  let stepList = [...Array(16)].map((el, i) => {
     if (i%3 === 0) {
      return <Step
              key={i}
              trackKey={props.trackKey}
              stepKey={i + (props.trackKey * 16)}
              count={props.count}
              select={props.selectHandle}
              steps={props.steps}
              trig={props.trigHandle}
            />; 
     } else {
      return <Step
              key={i}
              trackKey={props.trackKey}
              stepKey={i + (props.trackKey * 16)}
              count={props.count}
              select={props.selectHandle}
              steps={props.steps}
              trig={props.trigHandle}
            />;
     }
  });

  return (
    <div className="seqClass">
      {/*my sequencer*/}
      {stepList}
    </div>
  );
};

export default Sequencer;
