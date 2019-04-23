import * as React from 'react';

import DefaultNode from '../../../src/components/DefaultNode';
import { css } from 'glamor';
import { getSettings } from '../../dag-settings';
import { theme } from '../../styles';

export const endPointStyles = css({
  '&.right': {
    left: '190px',
  },
  borderRadius: '100%',
  height: '25px',
  left: '-12px',
  position: 'absolute',
  top: '25px',
  width: '25px',
  zIndex: 200001,
});
export const nodeWrapperStyles = css({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
});
export const nodeStyles = css({
  background: 'white',
  border: `2px solid ${theme.main.colors.blueGreen}`,
  cursor: 'pointer',
  display: 'inline-block',
  height: '100px',
  position: 'absolute',
  width: '200px',
  zIndex: 20000,
});

export default class NodeType1 extends DefaultNode {
  private rightEndpointRef: HTMLElement | null;

  public componentDidMount() {
    const { transformSource } = getSettings() as any;
    const initConfig = {
      endPointParams: [
        {
          element: this.rightEndpointRef,
          params: {
            ...transformSource,
            isSource: true,
            uuid: `${this.props.id}-transform`,
          },
          referenceParams: {},
        },
      ],
      makeTargetParams: {
        allowLoopback: false,
        anchor: 'ContinuousLeft',
        dropOptions: { hoverClass: 'drag-hover' },
        isTarget: true,
      },
      nodeId: this.props.id,
    };
    this.props.initNode(initConfig);
  }
  public render() {
    return (
      <div id={this.props.id} className={`${nodeStyles}`} style={this.props.config.style}>
        <div className={`${nodeWrapperStyles}`}>
          {this.props.config.label ? this.props.config.label : this.props.id}
          <div
            id={`${this.props.id}-right`}
            ref={(ref) => (this.rightEndpointRef = ref)}
            className={`${endPointStyles} right`}
          />
        </div>
      </div>
    );
  }
}
