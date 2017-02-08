import React, { Component } from 'react';

const Step = (props) => {
    // if step is active
    if (props.stepKey === props.count) {
      // if step is currently selected, trigger
      if (props.steps[props.stepKey]) {
        props.trig(props.stepKey);
        return <div
                  className="triggerClass"
                  onClick={props.select.bind(null, props.stepKey)}>
                </div>;
      } else {
        // if step is not selected,
        return <div
                  className="activeClass"
                  onClick={props.select.bind(null, props.stepKey)}>
                  {/*{props.stepKey}*/}
                </div>;
      }
      // if step is inactive
    } else {
      // if step is selected
      if (props.steps[props.stepKey]) {
        return <div
                  className="selectedClass"
                  onClick={props.select.bind(null, props.stepKey)}>
                  {}
                </div>;
      } else {
        return <div
                  className="stepClass"
                  onClick={props.select.bind(null, props.stepKey)}>
                  {}
                </div>;
      }
    }
};

export default Step;
