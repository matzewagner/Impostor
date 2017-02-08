import React, { Component } from 'react';
import InputForm from './inputForm.jsx';

const Track = (props) => {
  return (
    <div className="formClass">
      <InputForm {...props}/>
    </div>
  );
}

export default Track;
