/* @flow */

import React , { Component } from 'react';
import configureStore, {STOREACTIONS} from './dag-store';
import {getSettings} from './dag-settings';
import uuid from 'node-uuid';
import classnames from 'classnames';
// $FlowFixMe
import isNil from 'lodash/isNil';

import NodesList from './components/NodesList/NodesList';

require('./styles/dag.scss');
// $FlowFixMe
import jsPlumb from 'jsPlumb';

type propType = {
  className: string,
  children: Object,
  data: Object,
  additionalReducersMap: Object,
  enhancers: Array<Object>,
  middlewares: Array<Object>,
  settings: Object,
  store: Object,
  renderNode: (x: Object) => ?React$Element<any>,
  onNodesClick: (x: Object) => void
};
export {configureStore, STOREACTIONS};
export default class DAG extends Component {
  store: Object;
  settings: Object;
  instance: Object;
  state: {
    componentId: string,
    graph: Object,
    nodes: Array<Object>
  };
  storeSub: () => void;
  constructor(props: propType) {
    super(props);
    this.props = props;
    let {data, additionalReducersMap, enhancers = [], middlewares = []} = props;
    this.store = isNil(props.store) ? 
      configureStore(
        data,
        additionalReducersMap,
        [...middlewares],
        [...enhancers]
      )
    :
      props.store;
    if (props.data) {
      this.toggleLoading(true);
    }
    this.state = Object.assign({}, {
      componentId: 'A' + uuid.v4()
    }, this.store.getState());
    if (props.settings) {
      this.settings = Object.assign({}, props.settings);
    } else {
      this.settings = getSettings();
    }
    this.storeSub = this.store.subscribe( () => {
      this.setState(this.store.getState(), () => {
        this.resetGraph();
        this.renderGraph();
      });
    });
  }
  componentWillUnmount() {
    this.storeSub();
    this.store.dispatch({
      type: STOREACTIONS.RESET
    });
    this.resetGraph();
  }
  componentDidMount() {
    jsPlumb.ready(() => {
      let dagSettings = this.settings.default;
      let container = document.querySelector(`#${this.state.componentId} #dag-container`);
      jsPlumb.setContainer(container);
      this.instance = jsPlumb.getInstance(dagSettings);
      this.instance.bind('connection', this.makeConnections.bind(this));
      this.instance.bind('connectionDetached', this.makeConnections.bind(this));
    });
    setTimeout( () => {
      this.toggleLoading(false);
      if (Object.keys(this.props.data || {}).length) {
        this.renderGraph();
        this.cleanUpGraph();
      }
    }, 600);
  }
  toggleLoading(loading: bool) {
    this.store.dispatch({
      type: STOREACTIONS.GRAPHLOADING,
      payload: {
        loading: loading
      }
    });
  }
  makeNodesDraggable() {
    let nodes = document.querySelectorAll('#dag-container .node');
    this.instance.draggable(nodes, {
      start: () => { console.log('Starting to drag')},
      stop: (dragEndEvent) => {
        this.store.dispatch({
          type: STOREACTIONS.UPDATENODE,
          payload: {
            nodeId: dragEndEvent.el.id,
            style: {
              top: dragEndEvent.el.style.top,
              left: dragEndEvent.el.style.left
            }
          }
        });
        this.instance.repaintEverything();
      }
    });
  }
  makeConnections(info: Object, originalEvent: MouseEvent) {
    if (!originalEvent) { return; }
    let connections = this.instance
      .getConnections()
      .map(conn => ({
          from: conn.sourceId,
          to: conn.targetId
        })
      );
      this.store.dispatch({
        type: STOREACTIONS.SETCONNECTIONS,
        payload: {
          connections
        }
      });
  }
  addEndpoints() {
    let nodes = this.store.getState().nodes;
    this.instance.deleteEveryEndpoint();
    this.instance.detachEveryConnection();

    nodes.forEach(node => {
      let type = node.type;
      switch(type) {
        case 'source':
          this.instance.addEndpoint(node.id, this.settings.source, {uuid: node.id});
          return;
        case 'sink':
          this.instance.addEndpoint(node.id, this.settings.sink, {uuid: node.id});
          return;
        default:
          this.instance.addEndpoint(node.id, this.settings.transformSource, {uuid: `Left${node.id}`});
          this.instance.addEndpoint(node.id, this.settings.transformSink, {uuid: `Right${node.id}`});
      }
    });
  }
  // FIXME: This can be removed. Doesn't make sense to have this action here and the actual
  // reducer outside of this component.
  cleanUpGraph() {
    let {nodes, connections} = this.store.getState();
    this.store.dispatch({
      type: 'CLEANUP-GRAPH',
      payload: {nodes, connections}
    });

    this.store.dispatch({
      type: 'FIT-TO-SCREEN',
      payload: {
        nodes,
        connections,
        parentSelector: `#${this.state.componentId} .diagram-container`
      }
    });
    setTimeout(this.instance.repaintEverything.bind(this));
  }
  renderConnections() {
    let connectionsFromInstance = this.instance
      .getConnections()
      .map( conn => ({
          from: conn.sourceId,
          to: conn.targetId
        })
      );
    let {nodes, connections} = this.store.getState();
    if (connections.length === connectionsFromInstance.length) { return; }
    connections
      .forEach( connection => {
        var sourceNode = nodes.find(node => node.id === connection.from);
        var targetNode = nodes.find(node => node.id === connection.to);
        if (!sourceNode || !targetNode) {
          return;
        }
        var sourceId = sourceNode.type === 'transform' ? 'Left' + connection.from : connection.from;
        var targetId = targetNode.type === 'transform' ? 'Right' + connection.to : connection.to;
        var connObj = {
          uuids: [sourceId, targetId],
          detachable: true
        };
        this.instance.connect(connObj);
      });
  }
  resetGraph() {
    this.instance.unbind('connection');
    this.instance.unbind('connectionDetached');
    this.instance.detachEveryConnection();
    this.instance.deleteEveryEndpoint();
  }
  renderGraph() {
    this.instance.bind('connection', this.makeConnections.bind(this));
    this.instance.bind('connectionDetached', this.makeConnections.bind(this));
    this.addEndpoints();
    this.makeNodesDraggable();
    this.renderConnections();
    this.instance.repaintEverything();
  }
  render() {
    const loadingAnimation = () => {
      if (this.state.graph.loading) {
        return (
          <div className="fa fa-spin fa-refresh fa-5x"></div>
        );
      }
    };
    const loadNodes = () => {
      if (!this.state.graph.loading) {
        return (
          <NodesList
            nodes={this.state.nodes}
            onNodesClick={this.props.onNodesClick.bind(null, this.instance)}
            renderNode={this.props.renderNode.bind(null, this.instance)}
            jsPlumbInstance={this.instance}
          />
        );
      }
    };
    const getStyles = () => {
      let style = {
        transform : ''
      };
      if (this.state.graph.scale) {
        style.transform += `scale(${this.state.graph.scale})`;
        this.instance.setZoom(this.state.graph.scale);
      }
      if (this.state.graph.translate) {
        style.transform += `translate(${this.state.graph.translate})`;
      }
      return style;
    };
    return (
      <div
        className={classnames("react-dag", this.props.className)}
        id={this.state.componentId}
      >
        {this.props.children}
        <div className="diagram-container">
          <div id="dag-container" style={getStyles()}>
            {loadingAnimation()}
            {loadNodes()}
          </div>
        </div>
      </div>
    );
  }
}
