/*
  @flow
*/
import React, { Component } from 'react';
import Node from '../Node/Node';
import uuid from 'node-uuid';

type propType = {
  onClick: (x: Object) => void,
  nodes: Array<Object>
}
export default class NodesList extends Component {
  state: Object;
  constructor(props: propType) {
    super(props);
    let { nodes = []} = props;
    this.state = {
      nodes: nodes.map( node => Object.assign({}, node, { id: node.id || uuid.v4() }) )
    };
  }
  componentWillReceiveProps(newProps: propType) {
    this.setState({
      nodes: newProps.nodes.map(
        node => Object.assign({}, node, { id: node.id || uuid.v4() })
      )
    });
  }
  render() {
    return (
      <div className="dag-nodes-list">
        {
          this.state
            .nodes
            .map( node => {
              return (
                <Node style={node.style}
                  type={node.type}
                  label={node.label}
                  key={node.id}
                  id={node.id}
                  onClick={this.props.onClick}
                />
              )
            })
        }
      </div>
    );
  }
}
