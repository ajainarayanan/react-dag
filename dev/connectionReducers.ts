import { IConnectionParams, IConnectionRule, INode } from "../src/models";

export const transformConnectionEncoder: IConnectionRule = (
  connObj: IConnectionParams,
  instance: jsPlumbInstance,
  matchingNodes: INode[]
): IConnectionParams => {
  const newConnObj = {
    data: connObj.data,
    sourceId: connObj.sourceId,
    targetId: connObj.targetId,
  };
  const sourceNode = matchingNodes.find(
    node => node.id === newConnObj.sourceId
  );
  if (!sourceNode) {
    return connObj;
  }
  if (
    ["transform", "sink"].indexOf(sourceNode.config.type) !== -1 &&
    connObj.sourceId.indexOf("right") === -1
  ) {
    newConnObj.sourceId = `${connObj.sourceId}-right`;
  }
  return newConnObj;
};

export const transformConnectionDecoder: IConnectionRule = (
  connObj: IConnectionParams,
  instance: jsPlumbInstance,
  matchingNodes: INode[]
): IConnectionParams => {
  const newConnObj: IConnectionParams = {
    data: connObj.data,
    sourceId: connObj.sourceId,
    targetId: connObj.targetId,
  };
  const sourceNode = matchingNodes.find(
    node => connObj.sourceId.indexOf(`${node.id}-`) !== -1
  );
  if (!sourceNode) {
    return connObj;
  }

  if (
    ["transform", "sink"].indexOf(sourceNode.config.type) !== -1 &&
    connObj.sourceId.indexOf("right") !== -1
  ) {
    newConnObj.sourceId = `${connObj.sourceId.slice(
      0,
      connObj.sourceId.indexOf("-right")
    )}`;
  }
  return newConnObj;
};

export const conditionConnectionEncoder: IConnectionRule = (
  connObj: IConnectionParams,
  instance: jsPlumbInstance,
  matchingNodes: INode[]
): IConnectionParams => {
  const newConnObj: IConnectionParams = {
    data: connObj.data,
    sourceId: connObj.sourceId,
    targetId: connObj.targetId,
  };
  const sourceNode = matchingNodes.find(node => connObj.sourceId === node.id);
  if (!sourceNode) {
    return connObj;
  }

  if (
    sourceNode.config.type === "condition" &&
    connObj.sourceId.indexOf("bottom") === -1 &&
    connObj.sourceId.indexOf("right") === -1
  ) {
    if (connObj.data) {
      if (connObj.data.condition === "true") {
        newConnObj.sourceId = `${connObj.sourceId}-right`;
      } else {
        newConnObj.sourceId = `${connObj.sourceId}-bottom`;
      }
    }
  }
  return newConnObj;
};

export const conditionConnectionDecoder: IConnectionRule = (
  connObj: IConnectionParams,
  instance: jsPlumbInstance,
  matchingNodes: INode[]
) => {
  const newConnObj: IConnectionParams = {
    data: connObj.data,
    sourceId: connObj.sourceId,
    targetId: connObj.targetId,
  };
  const sourceNode = matchingNodes.find(
    node => connObj.sourceId.indexOf(`${node.id}-`) !== -1
  );

  if (!sourceNode) {
    return connObj;
  }

  if (sourceNode.config.type === "condition") {
    if (connObj.sourceId.indexOf("right") !== -1) {
      newConnObj.sourceId = `${connObj.sourceId.slice(
        0,
        connObj.sourceId.indexOf("-right")
      )}`;
      newConnObj.data = {
        condition: "true",
      };
    }
    if (connObj.sourceId.indexOf("bottom") !== -1) {
      newConnObj.sourceId = `${connObj.sourceId.slice(
        0,
        connObj.sourceId.indexOf("-bottom")
      )}`;
      newConnObj.data = {
        condition: "false",
      };
    }
  }
  return newConnObj;
};
