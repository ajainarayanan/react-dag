/*
  @flow
*/
import React, { Component } from 'react';
import Node from '../Node/Node';
import uuid from 'node-uuid';

type propType = {
  renderNode: (x: Object) => ?React$Element<any>,
  onNodesClick: (x: Object) => void,
  nodes: Array<Object>,
  jsPlumbInstance: Object
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
        node => {
          if (node.id) {
            return node;
          }
          return Object.assign({}, node, { id: node.id || uuid.v4() })
        }
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
              if (this.props.renderNode) {
                return this.props.renderNode(node);
              }
              return (
                <Node style={node.style}
                  type={node.type}
                  label={node.label}
                  key={node.id}
                  id={node.id}
                  onNodesClick={this.props.onNodesClick}
                />
              )
            })
        }
      </div>
    );
  }
}
