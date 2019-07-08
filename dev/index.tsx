import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  conditionConnectionDecoder,
  conditionConnectionEncoder,
  transformConnectionDecoder,
  transformConnectionEncoder,
} from './connectionReducers';
import { defaultSettings, dottedConnectionStyle, selectedConnectionStyle } from './dag-settings';
import { onConnectionEventHandler, onEndPointClick } from './eventHandlers';
import { setGlobal, theme } from './styles';

import DAG from '../src/dag';
import DefaultNode from '../src/components/DefaultNode';
import NodeType1 from './components/NodeType1';
import NodeType2 from './components/NodeType2';
import NodeType3 from './components/NodeType3';
import { css } from 'glamor';
import dagre from 'dagre';
// import { data } from './data';
import { complexData as data } from './data';
import uuidv4 from 'uuid/v4';

/* tslint:disable */
const cloneDeep = require("lodash.clonedeep");
/* tslint: enable */

const HEIGHT_OF_HEADER = 90;
const HEIGHT_OF_BUTTON_PANEL = 50;
const headerStyles = css({
  alignItems: "center",
  display: "flex",
  height: `${HEIGHT_OF_HEADER}px`,
  justifyContent: "center",
  margin: 0,
});

const buttonPanelStyles = css({
  alignItems: "center",
  background: "white",
  display: "flex",
  height: `${HEIGHT_OF_BUTTON_PANEL}px`,
  justifyContent: "center",
});

const buttonStyles = css({
  border: `1px solid ${theme.main.colors.salmonPink}`,
  boxShadow: `${theme.main.boxShadow()}`,
  fontSize: "inherit",
  margin: "0 5px",
  padding: "5px",
});
const nodeType1Styles = css({
  backgroundColor: theme.main.colors.blueGreen,
});

const nodeType2Styles = css({
  backgroundColor: theme.main.colors.teal,
});

const nodeType3Styles = css({
  backgroundColor: theme.main.colors.yellow,
});

const dagWrapperStyles = css({
  background: "white",
  height: `calc(100vh - ${HEIGHT_OF_HEADER}px - ${HEIGHT_OF_BUTTON_PANEL +
    1}px)`,
  width: "100vw",
});

const registerTypes = {
  connections: {
    dotted: dottedConnectionStyle,
    selected: selectedConnectionStyle,
  },
  endpoints: {},
};
const eventListeners = {
  click: onEndPointClick,
  connection: onConnectionEventHandler,
  endpointClick: onEndPointClick,
};

setGlobal();
const typeToComponentMap = {
  action: NodeType2,
  condition: NodeType3,
  sink: NodeType1,
  source: DefaultNode,
  transform: NodeType1,
};

const getComponent = (type: string) =>
  typeToComponentMap[type] ? typeToComponentMap[type] : DefaultNode;

const getLayout = (nodes, connections, separation = 200) => {
  const graph = new dagre.graphlib.Graph();
  graph.setGraph({
    marginx: 0,
    marginy: 0,
    nodesep: 90,
    rankdir: "LR",
    ranker: "longest-path",
    ranksep: separation,
  });
  graph.setDefaultEdgeLabel(() => ({}));

  nodes.forEach(node => {
    const id = node.id;
    graph.setNode(id, { label: node.config.label, width: 100, height: 100 });
  });

  connections.forEach(connection => {
    graph.setEdge(connection.sourceId, connection.targetId);
  });

  dagre.layout(graph);
  return graph;
};
const graphNodes = getLayout(data.nodes, data.connections);
data.nodes = data.nodes.map(node => {
  const location = graphNodes._nodes[node.id];
  return {
    ...node,
    config: {
      ...node.config,
      style: {
        left: `${location.x}px`,
        top: `${location.y}px`,
      },
    },
  };
});
class App extends React.Component {
  public state = {
    connections: data.connections,
    nodes: data.nodes,
    zoom: 1,
    loading: false
  };
  nodeCounter = 0;
  public addNode = (type: string) => {
    const generateNodeConfig = (t: string) => {
      this.nodeCounter += 1;
      return {
        config: {
          label: `Node Type: ${type} #${this.nodeCounter}`,
          type: t,
        },
        id: `Node-${this.nodeCounter}`
      }
    };
    this.setState({
      nodes: [...this.state.nodes, generateNodeConfig(type)],
    });
  };
  public setZoom = (zoomIn: boolean) => {
    if (zoomIn) {
      this.setState({ zoom: this.state.zoom + 0.2 });
    } else {
      this.setState({ zoom: this.state.zoom - 0.2 });
    }
  };
  public wipeout = () => {
    this.setState({
      loading: true,
      nodes: [],
      connections: []
    }, () => {
      setTimeout(() => {
        this.setState({
          loading: false
        });
      });
    });
  };
  public render() {
    if (this.state.loading) {
      return 'Loading ...';
    }
    return [
      <h1 className={`${headerStyles}`} key="title">
        An example of React DAG
      </h1>,
      <div className={`${buttonPanelStyles}`} key="button-panel">
        <button
          className={`${buttonStyles} ${nodeType1Styles}`}
          onClick={this.addNode.bind(null, "transform")}
          id="btn-add-node-type-1"
        >
          Add Node Type 1
        </button>
        <button
          className={`${buttonStyles} ${nodeType2Styles}`}
          onClick={this.addNode.bind(null, "action")}
          id="btn-add-node-type-2"
        >
          Add Node Type 2
        </button>
        <button
          className={`${buttonStyles} ${nodeType3Styles}`}
          onClick={this.addNode.bind(null, "condition")}
          id="btn-add-node-type-3"
        >
          Add Node Type 3
        </button>
        <button
          className={`${buttonStyles}`}
          onClick={this.addNode.bind(null, "source")}
          id="btn-add-node-type-4"
        >
          Add Node Type 4
        </button>
        <button
          className={`${buttonStyles} ${nodeType1Styles}`}
          onClick={this.addNode.bind(null, "sink")}
          id="btn-add-node-type-5"
        >
          Add Node Type 5
        </button>
        <button
          className={`${buttonStyles}`}
          onClick={this.setZoom.bind(this, true)}
          id="btn-add-zoom-in"
        >
          Zoom in
        </button>
        <button
          className={`${buttonStyles}`}
          onClick={this.setZoom.bind(this, false)}
          id="btn-add-zoom-out"
        >
          Zoom out
        </button>
        <button
          className={`${buttonStyles}`}
          onClick={this.wipeout}
          id="btn-wipeout"
        >Wipeout</button>
      </div>,
      <DAG
        className={`${dagWrapperStyles}`}
        key="dag"
        connections={cloneDeep(this.state.connections)}
        nodes={cloneDeep(this.state.nodes)}
        jsPlumbSettings={defaultSettings}
        connectionDecoders={[
          transformConnectionDecoder,
          conditionConnectionDecoder,
        ]}
        connectionEncoders={[
          transformConnectionEncoder,
          conditionConnectionEncoder,
        ]}
        eventListeners={eventListeners}
        registerTypes={registerTypes}
        onChange={({ nodes, connections }) => {
          console.log('OnChange: ', nodes, connections);
          this.setState({ nodes, connections }); // un-necessary cycle??
        }}
        zoom={this.state.zoom}
      >
        {this.state.nodes.map((node, i) => {
          const Component = getComponent(node.config.type);
          return <Component key={node.id} id={node.id} />;
        })}
      </DAG>,
    ];
  }
}

ReactDOM.render(<App />, document.getElementById("app-dag"));
