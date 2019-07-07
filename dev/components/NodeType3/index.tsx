import * as React from 'react';

import { endPointStyles, nodeWrapperStyles } from '../NodeType1';

import DefaultNode from '../../../src/components/DefaultNode';
import { css } from 'glamor';
import { getSettings } from '../../dag-settings';
import { theme } from '../../styles';

const nodeStyles = css({
  background: 'white',
  border: `2px solid ${theme.main.colors.yellow}`,
  cursor: 'pointer',
  height: '105px',
  position: 'absolute',
  width: '105px',
});

const modEndPointStyles = css({
  '&.bottom': {
    left: '45px',
    top: '80px',
  },
  '&.right': {
    left: '95px',
    top: '18px',
  },
});

const closeButton = css({
  position: 'absolute',
  top: '5px',
  right: '10px',
});

export default class NodeType3 extends DefaultNode {
  private rightEndpointRef: HTMLElement | null;
  private bottomEndpointRef: HTMLElement | null;

  public componentDidMount() {
    const { conditionBottomEndpoint, conditionRightEndpoint } = getSettings() as any;
    const initConfig = {
      endPointParams: [
        {
          element: this.rightEndpointRef,
          params: {
            ...conditionRightEndpoint,
            isSource: true,
            uuid: `${this.props.id}-condition-right`,
            cssClass: `${this.props.id}-condition-right`,
          },
          referenceParams: {},
        },
        {
          element: this.bottomEndpointRef,
          params: {
            ...conditionBottomEndpoint,
            uuid: `${this.props.id}-condition-bottom`,
            cssClass: `${this.props.id}-condition-bottom`,
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

  private delete = () => {
    this.props.onDelete(this.props.id, [
      `${this.props.id}-condition-right`,
      `${this.props.id}-condition-bottom`,
    ]);
  };

  public render() {
    return (
      <div id={this.props.id} className={`${nodeStyles}`} style={this.props.config.style}>
        <div className={`${nodeWrapperStyles}`}>
          {this.props.config.label ? this.props.config.label : this.props.id}
          <span className={`${closeButton}`} data-cy="close-button" onClick={this.delete}>
            X
          </span>
          <div
            id={`${this.props.id}-condition-right`}
            ref={(ref) => (this.rightEndpointRef = ref)}
            className={`${endPointStyles} ${modEndPointStyles} right`}
          />
          <div
            id={`${this.props.id}-condition-bottom`}
            ref={(ref) => (this.bottomEndpointRef = ref)}
            className={`${endPointStyles} ${modEndPointStyles} bottom`}
          />
        </div>
      </div>
    );
  }
}
