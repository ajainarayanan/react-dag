/* @flow */

import React, { Component } from 'react';
import classnames from 'classnames';
require('./Node.scss');

type propType = {
  style: Object,
  label: string,
  id: string,
  type: string,
  onNodesClick: (x: Object) => void,
  jsPlumbInstance: Object,
};

export default class Node extends Component {
  state: {
    style: Object,
    label: string,
    id: string,
    type: string,
  };
  static defaultProps = {
    onClick: () => {},
  };
  constructor(props: propType) {
    super(props);
    const { style, type, label, id } = props;
    this.state = {
      style,
      type,
      label,
      id,
    };
  }
  componentWillReceiveProps(newProps: propType) {
    const { style, type, label, id } = newProps;
    this.setState({
      style,
      type,
      label,
      id,
    });
  }
  componentWillUnmount() {
    this.props.jsPlumbInstance.remove(this.state.id, false);
  }
  render() {
    return (
      <div
        className="node text-center"
        id={this.state.id}
        style={this.state.style}
        onClick={this.props.onNodesClick.bind(null, 'click', this.state)}
      >
        <div className={classnames({ 'dag-node': true, [this.state.type]: true })}>
          <strong
            className="close-btn"
            onClick={e => {
              this.props.onNodesClick.bind(null, 'close', this.state);
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              e.preventDefault();
              return false;
            }}
          >
            x
          </strong>
        </div>
        <div className="label">
          {this.state.label}
        </div>
      </div>
    );
  }
}
