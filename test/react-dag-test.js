import {DAG} from '../dag';

var expect = require('expect');
import React from 'react';
import { shallow } from 'enzyme';

describe('<DAG />', () => {
  it('renders <DAG /> component', () => {
    const wrapper = shallow(<DAG />);
    expect(wrapper.find('#dag-container').length).toEqual(1);
  });
});
