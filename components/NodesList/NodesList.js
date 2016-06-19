import Node from '../Node/Node';
import React, { Component } from 'react';
import uuid from 'node-uuid';

export default class NodesList extends Component {
  constructor(props) {
    super(props);
    let { nodes = []} = props;
    this.state = {
      nodes: nodes.map( node => Object.assign({}, node, { id: node.id || uuid.v4() }) )
    };
  }
  render() {
    return (
      <div>
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
                />
              )
            })
        }
      </div>
    );
  }
}
