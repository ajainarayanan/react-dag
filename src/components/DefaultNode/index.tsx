import 'jsplumb';

import * as React from 'react';
import { INodeConfig, IInitNodeProps, endpointUUID } from '../../models';

export interface INodeProps {
  id: string;
  config?: INodeConfig;
  initNode?: (initConfig: IInitNodeProps) => void;
  onDelete?: (nodeId: string, endpoints: endpointUUID[]) => void;
}

export default class DefaultNode extends React.Component<INodeProps, {}> {
  public static defaultProps: Partial<INodeProps> = {
    config: {
      style: {},
    },
  };

  private rootRef: HTMLElement | null;

  public componentDidMount() {
    const source = {
      endpoint: 'Dot',
      isSource: true,
      maxConnections: -1, // -1 means unlimited connections
      paintStyle: {
        connectorStyle: {
          lineWidth: 2,
          outlineColor: 'transparent',
          outlineWidth: 4,
          strokeStyle: '#4e5568',
          strokeWidth: 3,
        },
        fill: 'black',
        lineWidth: 3,
        radius: 5,
        stroke: 'black',
      },
    };
    if (this.props.initNode && typeof this.props.initNode === 'function') {
      const initConfig = {
        endPointParams: [
          {
            element: this.rootRef,
            params: source,
            referenceParams: {},
          },
        ],
        nodeId: this.props.id,
      };
      this.props.initNode(initConfig);
    }
  }
  public render() {
    let style = {
      border: '1px solid',
      display: 'inline-block',
      height: '100px',
      position: 'absolute' as 'absolute', // This is madness!!
      width: '100px',
    };
    if (this.props.config) {
      style = {
        ...style,
        ...this.props.config.style,
      };
    }
    return (
      <div id={this.props.id} ref={(ref) => (this.rootRef = ref)} style={style}>
        {this.props.config && this.props.config.label ? this.props.config.label : this.props.id}
      </div>
    );
  }
}
