/* @flow */
import _ from 'lodash';
const extend = _.extend;
const clone = _.clone;

export const defaultSettings = {
  Connector : [ 'Flowchart', {gap: 6, stub: [10, 15], alwaysRespectStubs: true} ],
  ConnectionsDetachable: true
};

export const connectorStyle = {
  stroke: 'black',
  strokeWidth: 2,
  radius: 5,
  lineWidth: 2
};
export const connectorOverlays = {
  connectorOverlays: [
    [ 'Arrow', { location: 1, length: 12, width: 12, height: 10, foldback: 1 } ]
  ]
};
export const disabledConnectorOverlays = {
  connectorOverlays: [
    [ 'Arrow', { location: 1, length: 12, width: 12, height: 10, foldback: 1 } ]
  ]
};

export const commonSettings = {
  endpoint:'Dot',
  maxConnections: -1, // -1 means unlimited connections
  paintStyle: {
    stroke: 'black',
    fill: 'black',
    radius: 5,
    lineWidth: 3
  },
  anchors: [ 'Static']
};
export const sourceSettings = extend({
  isSource: true,
  connectorStyle: connectorStyle,
  anchor: [ 0.5, 1, 1, 0, 26, -43, 'sourceAnchor']
}, commonSettings);
export const sinkSettings = extend({
  isTarget: true,
  anchor: [ 0.5, 1, -1, 0, -26, -43, 'sinkAnchor'],
  connectorStyle: connectorStyle
}, commonSettings);

export function getSettings(isDisabled: ?boolean = false) {
  var settings: Object = {};
  if (isDisabled) {
    settings = {
      default: defaultSettings,
      commonSettings: extend(commonSettings, disabledConnectorOverlays),
      source: extend(sourceSettings, disabledConnectorOverlays),
      sink: extend(sinkSettings, disabledConnectorOverlays)
    };
  } else {
    settings = {
      default: defaultSettings,
      commonSettings: extend(commonSettings, connectorOverlays),
      source: extend(sourceSettings, connectorOverlays),
      sink: extend(sinkSettings, connectorOverlays)
    };
  }

  settings.transformSource = clone(settings.source);
  settings.transformSink = clone(settings.sink);
  settings.transformSource.anchor = [ 0.5, 1, 1, 0, 26, -43, 'transformAnchor'];
  settings.transformSink.anchor = [ 0.5, 1, -1, 0, -26, -43, 'transformAnchor'];

  return settings;
}
