import React from 'react';
import { shallow } from 'enzyme';
import Step from './../app/client/js/components/step.jsx';
import Player from './../app/client/js/components/player.jsx';

describe('Step item', () => {
  const wrapper = shallow(<Player />);
  console.log(wrapper);
});