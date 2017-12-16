import clone from "lodash/clone";
import extend from "lodash/extend";

const defaultConnectionStyle = {
  hoverPaintStyle: {
    dashstyle: "solid",
    lineWidth: 4,
    strokeStyle: "#58b7f6",
    strokeWidth: 3,
  },
  paintStyle: {
    lineWidth: 2,
    outlineColor: "transparent",
    outlineWidth: 4,
    strokeStyle: "#4e5568",
    strokeWidth: 3,
  },
};

export const defaultSettings = Object.assign(
  {
    ConnectionOverlays: [
      [
        "Arrow",
        {
          foldback: 0.8,
          id: "arrow",
          length: 14,
          location: 1,
        },
      ],
    ],
    Connector: [
      "Flowchart",
      {
        alwaysRespectStubs: true,
        cornerRadius: 20,
        midpoint: 0.2,
        stub: [10, 15],
      },
    ],
    Endpoint: "Dot",
    EndpointStyle: { radius: 10 },
  },
  /* tslint:disable */
  defaultConnectionStyle
  /* tslint:enable */
);

export const connectorStyle = {
  lineWidth: 2,
  radius: 5,
  stroke: "black",
  strokeWidth: 2,
};

export const commonSettings = {
  endpoint: "Dot",
  maxConnections: -1, // -1 means unlimited connections
  paintStyle: {
    connectorStyle: defaultConnectionStyle.paintStyle,
    fill: "black",
    lineWidth: 3,
    radius: 5,
    stroke: "black",
  },
};
export const sourceSettings = {
  ...commonSettings,
  isSource: true,
};
export const sinkSettings = {
  ...commonSettings,
  isTarget: true,
};
export const conditionRightEndpoint = {
  overlays: [
    ["Label", { id: "yesLabel", label: "Yes", location: [0.5, -0.55] }],
  ],
  ...sourceSettings,
};

export const conditionBottomEndpoint = {
  anchor: "Bottom",
  overlays: [
    [
      "Label",
      {
        id: "noLabel",
        label: "No",
        location: [0.5, -0.55],
      },
    ],
  ],
  ...sourceSettings,
};

export const dottedConnectionStyle = {
  paintStyle: {
    dashstyle: "2 4",
    lineWidth: 2,
    outlineColor: "transparent",
    outlineWidth: 4,
    strokeStyle: "#0099ff",
    strokeWidth: 2,
  },
};

export const selectedConnectionStyle = {
  paintStyle: {
    dashstyle: "solid",
    lineWidth: 4,
    outlineColor: "transparent",
    outlineWidth: 4,
    strokeStyle: "#58b7f6",
  },
};

export function getSettings(isDisabled = false) {
  let settings = {} as any;
  if (isDisabled) {
    settings = {
      commonSettings,
      conditionBottomEndpoint,
      conditionRightEndpoint,
      default: defaultSettings,
      sink: sinkSettings,
      source: sourceSettings,
      transformSink: {},
      transformSource: {},
    };
  } else {
    settings = {
      commonSettings,
      conditionBottomEndpoint,
      conditionRightEndpoint,
      default: defaultSettings,
      sink: sinkSettings,
      source: sourceSettings,
      transformSink: {},
      transformSource: {},
    };
  }

  settings.transformSource = clone(settings.source);
  settings.transformSink = clone(settings.sink);

  return settings;
}
