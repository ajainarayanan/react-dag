import "jsplumb";

import * as React from "react";

// export = ReactDAG;
export as namespace ReactDAG;
// export default DAG;

export interface IEventProps {
  [anyProp: string]: (...args: any[]) => void;
}
export interface INodeProps {
  id: string;
  config?: INodeConfig;
  initNode?: (initConfig: IInitNodeProps) => void;
  onDelete?: () => void;
}
export class DefaultNode extends React.Component<INodeProps, {}> {
  static defaultProps: Partial<INodeProps>;
  private rootRef;
  componentDidMount(): void;
  render(): JSX.Element;
}

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
export default class DAG extends React.Component<IDAGProps, IDAGState> {
  static defaultProps: Partial<IDAGProps>;
  private removeNode;
  private addConnection;
  private removeConnection;
  private updateParent;
  state: {
    connections: IConnectionParams[];
    isJsPlumbInstanceCreated: boolean;
    jsPlumbInstance: any;
    nodes: INode[];
    zoom: number;
  };
  componentWillReceiveProps(nextProps: IDAGProps): void;
  componentDidMount(): void;
  componentDidUpdate(): void;
  private setZoom;
  private registerTypes;
  private setEventListeners;
  initNode: (
    {
      nodeId,
      endPointParams,
      makeSourceParams,
      makeTargetParams,
    }: IInitNodeProps
  ) => void;
  makeConnections: () => void;
  addEndpoint: (
    element: HTMLElement | null,
    params?: Object,
    referenceParams?: Object
  ) => void;
  makeNodeDraggable: (id: string) => void;
  getNewConnectionObj: (
    connObj: IConnectionParams,
    encoders?: IConnectionRule[]
  ) => IConnectionParams;
  onConnection: (connObj: IConnectionParams, originalEvent: boolean) => void;
  onConnectionDetached: (
    detachedConnObj: IConnectionParams,
    originalEvent: boolean
  ) => void;
  private getNodeConfig;
  onDeleteNode: (nodeId: string) => void;
  private renderChildren();
  render(): JSX.Element;
}

export interface INodeConfig {
  label?: string;
  [newProps: string]: any;
}
export interface INode {
  id: string;
  config?: INodeConfig;
}
export interface IConnections {
  from: string;
  to: string;
}
export interface IData {
  nodes: INode[];
  connections: IConnectionParams[];
  [extraProps: string]: any;
}
export interface IConnectionParams extends ConnectParams {
  [extraProps: string]: any;
  source?: any;
  target?: any;
  sourceId: string;
  targetId: string;
}
export interface IEndPointArgs {
  element: HTMLElement | null;
  params?: EndpointParams;
  referenceParams?: EndpointParams;
}
export interface IInitNodeProps {
  nodeId: string;
  endPointParams?: IEndPointArgs[];
  makeSourceParams?: any;
  makeTargetParams?: any;
}
export type IConnectionRule = (
  connectionObj: IConnectionParams,
  jsplumbInstance: jsPlumbInstance,
  matchingNodes: INode[]
) => IConnectionParams;
