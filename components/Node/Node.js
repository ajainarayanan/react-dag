/* @flow */

import React, { Component } from 'react';
import classnames from 'classnames';
require('./Node.scss');

type propType = {
  style: Object,
  label: string,
  id: string,
  type: string,
  onNodesClick: (x: Object) => void
};

export default class Node extends Component {
  state: {
    style: Object,
    label: string,
    id: string,
    type: string
  };
  static defaultProps = {
    onClick: () => {}
  };
  constructor(props: propType) {
    super(props);
    const { style, type, label, id } = props;
    this.state = {
      style,
      type,
      label,
      id
    };
  }
  componentWillReceiveProps(newProps: propType) {
    const { style, type, label, id } = newProps;
    this.setState({
      style,
      type,
      label,
      id
    });
  }
  render() {
    return (
      <div
        className="node text-center"
        id={this.state.id}
        style={this.state.style}
        onClick={this.props.onNodesClick.bind(null, 'click', this.state)}
      >
        <div className={classnames({'dag-node': true, [this.state.type]: true})}>
          <strong
            className="close-btn"
            onClick={(e) => {
              this.props.onNodesClick.bind(null, 'close', this.state);
              e.preventDefault();
              e.preventPropagation();
              return false;
            }}
          >
            x
          </strong>
        </div>
        <div className="label">{this.state.label}</div>
      </div>
    );
  }
}
