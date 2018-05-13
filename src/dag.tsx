import "jsplumb";
import * as Models from "./models";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as uuidv4 from "uuid/v4";
import DefaultNode, { INodeProps } from "./components/DefaultNode";
import Pan from "./components/Pan";
import {
  IConnectionParams,
  IConnectionRule,
  IConnections,
  IData,
  IEndPointArgs,
  IInitNodeProps,
  INode,
} from "./models";

import { Children } from "react";

export interface IEventProps {
  [anyProp: string]: (...args: any[]) => void;
}

export { Models, DefaultNode, INodeProps };

export interface IRegisterTypesProps {
  connections: {
    [anyProp: string]: any;
  };
  endpoints: {
    [anyProp: string]: any;
  };
}
export interface IChangeProps {
  nodes: INode[];
  connections: IConnectionParams[];
}
export interface IDAGProps {
  className?: string;
  connectionDecoders?: IConnectionRule[];
  connectionEncoders?: IConnectionRule[];
  connections: IConnectionParams[];
  eventListeners?: IEventProps;
  jsPlumbSettings?: object;
  onChange?: (changeParams: IChangeProps) => void;
  registerTypes?: IRegisterTypesProps;
  nodes: INode[];
  zoom: number;
}

export interface IDAGState {
  jsPlumbInstance: jsPlumbInstance;
  isJsPlumbInstanceCreated: boolean;
  nodes: INode[];
  connections: IConnectionParams[];
  zoom: number;
}

const DAG_CONTAINER_ID = `DAG-${uuidv4()}`;

export default class DAG extends React.Component<IDAGProps, IDAGState> {
  public static defaultProps: Partial<IDAGProps> = {
    connectionDecoders: [],
    connectionEncoders: [],
    connections: [],
    eventListeners: {},
    nodes: [],
    registerTypes: {
      connections: {},
      endpoints: {},
    },
    zoom: 1,
  };

  private removeNode = (nodeId: string) => {
    this.setState({
      nodes: this.state.nodes.filter((node: INode) => node.id !== nodeId),
    });
    this.updateParent();
  };

  private addConnection = (connection: IConnectionParams) => {
    if (
      this.state.connections.find(
        conn =>
          conn.sourceId === connection.sourceId &&
          conn.targetId === connection.targetId
      )
    ) {
      return;
    }
    this.setState({
      connections: [...this.state.connections, connection],
    });
    this.updateParent();
  };

  private removeConnection = (connection: IConnectionParams) => {
    this.setState({
      connections: this.state.connections.filter(
        (conn: IConnectionParams) =>
          !(
            conn.sourceId === connection.sourceId &&
            conn.targetId === connection.targetId
          )
      ),
    });
    this.updateParent();
  };

  private updateParent = () => {
    if (this.props.onChange) {
      this.props.onChange({
        connections: this.state.connections,
        nodes: this.state.nodes,
      });
    }
  };

  public state = {
    connections: this.props.connections,
    isJsPlumbInstanceCreated: false,
    jsPlumbInstance: jsPlumb.getInstance(this.props.jsPlumbSettings || {}),
    nodes: this.props.nodes,
    zoom: this.props.zoom,
  };

  public componentWillReceiveProps(nextProps: IDAGProps) {
    const { nodes, zoom, connections } = nextProps;
    this.setState({ nodes, zoom, connections });
  }

  public componentDidMount() {
    jsPlumb.ready(() => {
      const jsPlumbInstance = jsPlumb.getInstance({
        Container: DAG_CONTAINER_ID,
      });
      jsPlumbInstance.setContainer(document.getElementById(DAG_CONTAINER_ID));
      jsPlumbInstance.bind("connection", this.onConnection);
      jsPlumbInstance.bind("connectionDetached", this.onConnectionDetached);
      this.setEventListeners(jsPlumbInstance);
      this.registerTypes(jsPlumbInstance);
      this.setState({
        isJsPlumbInstanceCreated: true,
        jsPlumbInstance,
      });
    });
  }

  public componentDidUpdate() {
    if (this.state.isJsPlumbInstanceCreated) {
      this.setZoom();
    }
  }

  private setZoom = () => {
    const el = this.state.jsPlumbInstance.getContainer();
    const transformOrigin = [0.5, 0.5];
    const browserPrefix = ["webkit", "moz", "ms", "o"];
    const s = `scale(${this.state.zoom})`;
    const style = `${transformOrigin[0] * 100}% ${transformOrigin[1] * 100}%`;

    for (const bPrefix of browserPrefix) {
      el.style[`${bPrefix}Transform`] = s;
      el.style[`${bPrefix}TransformOrigin`] = style;
    }

    el.style.transform = s;
    el.style.transformOrigin = style;

    this.state.jsPlumbInstance.setZoom(this.state.zoom, true);
  };

  private registerTypes = (jsPlumbInstance: jsPlumbInstance) => {
    if (typeof this.props.registerTypes === "undefined") {
      return;
    }
    const { connections, endpoints } = this.props.registerTypes;
    if (Object.keys(connections).length) {
      jsPlumbInstance.registerConnectionTypes(connections);
    }
    if (Object.keys(endpoints).length) {
      jsPlumbInstance.registerEndpointTypes(endpoints);
    }
  };

  private setEventListeners = (jsPlumbInstance: jsPlumbInstance) => {
    if (typeof this.props.eventListeners !== "undefined") {
      Object.keys(this.props.eventListeners).forEach(event => {
        if (
          this.props.eventListeners &&
          typeof this.props.eventListeners[event] !== "undefined"
        ) {
          jsPlumbInstance.bind(event, this.props.eventListeners[event]);
        }
      });
    }
  };

  public initNode = ({
    nodeId,
    endPointParams = [],
    makeSourceParams = {},
    makeTargetParams = {},
  }: IInitNodeProps) => {
    endPointParams.map(endpoint => {
      const { element, params, referenceParams } = endpoint;
      this.addEndpoint(element, params, referenceParams);
    });
    if (Object.keys(makeSourceParams).length) {
      this.state.jsPlumbInstance.makeSource(nodeId, makeSourceParams);
    }
    if (Object.keys(makeTargetParams).length) {
      this.state.jsPlumbInstance.makeTarget(nodeId, makeTargetParams);
    }
    this.makeNodeDraggable(nodeId);
    this.makeConnections();
  };

  public makeConnections = () => {
    if (!this.state.jsPlumbInstance) {
      return;
    }
    this.state.jsPlumbInstance.deleteEveryConnection();
    this.props.connections.forEach(connObj => {
      const newConnObj = this.getNewConnectionObj(
        connObj,
        this.props.connectionEncoders
      );
      if (
        (this.state.jsPlumbInstance.getEndpoints(newConnObj.sourceId).length ||
          this.state.jsPlumbInstance.isSource(newConnObj.sourceId)) &&
        (this.state.jsPlumbInstance.getEndpoints(newConnObj.targetId).length ||
          this.state.jsPlumbInstance.isTarget(newConnObj.targetId))
      ) {
        newConnObj.source = newConnObj.sourceId;
        newConnObj.target = newConnObj.targetId;
        this.state.jsPlumbInstance.connect(newConnObj);
      }
    });
  };

  public addEndpoint = (
    element: HTMLElement | null,
    params: EndpointParams = {},
    referenceParams: EndpointParams = {}
  ) => {
    if (!element) {
      return;
    }
    this.state.jsPlumbInstance.addEndpoint(element, params, referenceParams);
  };

  public makeNodeDraggable = (id: string) => {
    this.state.jsPlumbInstance.draggable(id);
  };

  public getNewConnectionObj = (
    connObj: IConnectionParams,
    encoders: IConnectionRule[] = []
  ): IConnectionParams => {
    const newConnObj = encoders.reduce(
      (prev, curr) => curr(prev, this.state.jsPlumbInstance, this.props.nodes),
      { ...connObj }
    );
    if (newConnObj.data) {
      return {
        data: newConnObj.data || {},
        sourceId: newConnObj.sourceId,
        targetId: newConnObj.targetId,
      };
    }
    return {
      sourceId: newConnObj.sourceId,
      targetId: newConnObj.targetId,
    };
  };

  public onConnection = (
    connObj: IConnectionParams,
    originalEvent: boolean
  ) => {
    if (!originalEvent) {
      return;
    }
    const newConnObj = this.getNewConnectionObj(
      connObj,
      this.props.connectionDecoders
    );
    this.addConnection(newConnObj);
    this.state.jsPlumbInstance.repaintEverything();
  };

  public onConnectionDetached = (
    detachedConnObj: IConnectionParams,
    originalEvent: boolean
  ) => {
    if (!originalEvent) {
      return;
    }
    const newConnObj = this.getNewConnectionObj(
      detachedConnObj,
      this.props.connectionDecoders
    );
    this.removeConnection(newConnObj);
    this.state.jsPlumbInstance.repaintEverything();
  };

  private getNodeConfig = (nodeId: string) => {
    const n = this.props.nodes.find(node => node.id === nodeId);
    if (!n) {
      return {};
    }
    return n.config;
  };

  public onDeleteNode = (nodeId: string) => {
    this.removeNode(nodeId);
  };

  private renderChildren() {
    if (!this.state.isJsPlumbInstanceCreated) {
      return "...loading";
    }

    return React.Children.map(this.props.children, child => {
      if (
        typeof child === "string" ||
        typeof child === "number" ||
        child === null ||
        typeof child === "undefined"
      ) {
        return child;
      }
      return React.cloneElement(child as React.ReactElement<DefaultNode>, {
        ...child.props,
        config: this.getNodeConfig(child.props.id),
        id: child.props.id,
        initNode: this.initNode,
        key: child.props.id,
        onDelete: this.onDeleteNode,
      });
    });
  }

  public render() {
    return (
      <div
        key={DAG_CONTAINER_ID}
        className={this.props.className}
        style={{
          height: "100%",
          overflow: "hidden",
          position: "relative",
          width: "100%",
        }}
      >
        <Pan>
          <div
            style={{
              height: "inherit",
              position: "absolute",
              width: "inherit",
            }}
            id={DAG_CONTAINER_ID}
          >
            {this.renderChildren()}
          </div>
        </Pan>
      </div>
    );
  }
}
