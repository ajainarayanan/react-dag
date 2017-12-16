import "jsplumb";

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

export const DEFAULTSTORESTATE: IData = {
  connections: [],
  nodes: [],
};

export const DEFAULT_NODES = [];
export const DEFAULT_CONNECTIONS = [];
