import React, { Component } from 'react';

const InputForm = (props) => {
  return (
    <div>
      <form id="queryForm" onSubmit={ props.inputHandle }>
        <input name="freesoundQuery" type="text" placeholder="freesound.org search"/>
        <button className="submitButton" type="submit">send</button>
      </form>
    </div>
  );
};

export default InputForm;
