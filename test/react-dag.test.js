require('./setup');
import DAG from '../dag';
import { data } from '../dev/data';
var expect = require('expect');
import React from 'react';
import { shallow, mount } from 'enzyme';
import { STOREACTIONS } from '../dag-store';
jest.useFakeTimers();

describe('<DAG />', () => {
  it('renders <DAG /> component', () => {
    const wrapper = shallow(<DAG />);
    expect(wrapper.find('#dag-container').length).toEqual(1);
    wrapper.unmount();
  });
  it('has default state', () => {
    const wrapper = shallow(<DAG />);
    expect(wrapper.state('nodes').length).toBe(0);
    expect(Object.keys(wrapper.state('graph')).length).toBe(0);
    wrapper.unmount();
  });
  it('accepts user defined data as prop', () => {
    const wrapper = shallow(<DAG data={data} />);
    expect(wrapper.state('nodes').length).toBe(16);
    wrapper.unmount();
  });
  it('creates jsplumb instance', () => {
    const wrapper = mount(<DAG />);
    jest.runAllTimers();
    let dagInstance = wrapper.instance();
    expect(typeof dagInstance.instance).toBe('object');
    expect(dagInstance.instance.getConnections().length).toBe(0);
    wrapper.unmount();
  });
  it('created jsplumb instance has right config based on data passed', () => {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);
    const wrapper = mount(<DAG data={data} />, {
      attachTo: div,
    });
    let dagInstance = wrapper.instance();
    let nodes = dagInstance.store.getState().nodes;
    jest.runAllTimers();
    expect(dagInstance.instance.getConnections().length).toBe(22);
    expect(nodes.length).toBe(16);
  });
  it('updates dom based on changes to the state', () => {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);
    const wrapper = mount(<DAG />, {
      attachTo: div,
    });
    let dagInstance = wrapper.instance();
    let store = dagInstance.store;
    jest.runAllTimers();
    expect(dagInstance.instance.getConnections().length).toBe(0);
    store.dispatch({
      type: STOREACTIONS.ADDNODE,
      payload: {
        type: 'source',
        label: 'customsource',
        id: 'customsource1',
      },
    });
    store.dispatch({
      type: STOREACTIONS.ADDNODE,
      payload: {
        type: 'transform',
        label: 'customtransform1',
        id: 'customtransform1',
      },
    });
    store.dispatch({
      type: STOREACTIONS.SETCONNECTIONS,
      payload: {
        connections: [
          {
            from: 'customsource1',
            to: 'customtransform1',
          },
        ],
      },
    });
    expect(dagInstance.instance.getConnections().length).toBe(1);
    expect(store.getState().nodes.length).toBe(2);
    expect(store.getState().connections.length).toBe(1);
  });
});
