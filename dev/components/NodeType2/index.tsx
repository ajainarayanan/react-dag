import * as React from 'react';

import { endPointStyles, nodeStyles, nodeWrapperStyles } from '../NodeType1';

import DefaultNode from '../../../src/components/DefaultNode';
import { css } from 'glamor';
import { getSettings } from '../../dag-settings';
import { theme } from '../../styles';

const modNodeStyle = css({
  border: `2px solid ${theme.main.colors.teal}`,
});

const closeButton = css({
  position: 'absolute',
  top: '5px',
  right: '10px',
});

const modEndpointStyles = css({});
export default class NodeType2 extends DefaultNode {
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
            uuid: `${this.props.id}-DottedEndpoint-right`,
            cssClass: `${this.props.id}-DottedEndpoint-right`,
          },
          referenceParams: {},
        },
      ],
      makeTargetParams: {
        allowLoopback: false,
        anchor: 'ContinuousLeft',
        dropOptions: { hoverClass: 'drag-hover' },
        isTarget: true,
        uuid: `${this.props.id}-DottedEndPoint`,
      },
      nodeId: this.props.id,
    };
    this.props.initNode(initConfig);
  }
  private delete = () => {
    this.props.onDelete(this.props.id, [
      `${this.props.id}-DottedEndpoint-right`,
      `${this.props.id}-DottedEndPoint`,
    ]);
  };
  public render() {
    return (
      <div
        id={this.props.id}
        className={`${nodeStyles} ${modNodeStyle}`}
        style={this.props.config.style}
      >
        <div className={`${nodeWrapperStyles}`}>
          {this.props.config.label ? this.props.config.label : this.props.id}
          <span className={`${closeButton}`} data-cy="close-button" onClick={this.delete}>
            X
          </span>
        </div>
        <div
          id={`${this.props.id}-DottedEndpoint-right`}
          ref={(ref) => (this.rightEndpointRef = ref)}
          className={`${endPointStyles} ${modEndpointStyles} right`}
        />
      </div>
    );
  }
}
