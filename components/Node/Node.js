import React, { Component } from 'react';
import classnames from 'classname';

export default class Node extends Component {
  constructor(props) {
    super(props);
    const { style, type, label, id } = props;
    this.state = {
      style,
      type,
      label,
      id
    };
  }
  render() {
    return (
      <div className="box text-center"
            id={this.state.id}
            style={this.state.style}>
        <div className={classnames({'dag-node': true, [this.state.type]: true})}></div>
          <div className="label">{this.state.label}</div>
      </div>
    )
  }
}
