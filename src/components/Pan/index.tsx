/*
  Heavily inspired/lifted from this idea: https://stackoverflow.com/a/39311435/661768
  without jqueryUI or jquery dependency.
*/
import * as React from "react";

export interface IDragData {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export interface IPanStateType {
  dragging: boolean;
  dragData: IDragData;
  matrixData: number[];
}
export interface IPanProps {
  height?: string;
}
export default class Pan extends React.PureComponent<IPanProps, IPanStateType> {
  public static defaultProps = {
    height: "100%",
  };
  // Used to set cursor while moving.
  private panWrapper: any;
  // Used to set transform for pan.
  private panContainer: any;
  public state = {
    dragData: {
      dx: 0,
      dy: 0,
      x: 0,
      y: 0,
    },
    dragging: false,
    matrixData: [1, 0, 0, 1, 0, 0], // [zoom, skew, skew, zoom, dx, dy]
  };

  private onMouseDown = (e: React.MouseEvent<EventTarget>) => {
    const { matrixData, dragData } = this.state;
    const offsetX = matrixData[4];
    const offsetY = matrixData[5];
    const newDragData: IDragData = {
      dx: offsetX,
      dy: offsetY,
      x: e.pageX,
      y: e.pageY,
    };
    this.setState({
      dragData: newDragData,
      dragging: true,
    });
    if (this.panWrapper) {
      this.panWrapper.style.cursor = "move";
    }
  };

  private onMouseUp = () => {
    this.setState({
      dragging: false,
    });
    if (this.panWrapper) {
      this.panWrapper.style.cursor = "";
    }
  };

  private onMouseMove = (e: React.MouseEvent<EventTarget>) => {
    if (this.state.dragging) {
      const { dragData, matrixData } = this.state;
      const deltaX = dragData.x - e.pageX;
      const deltaY = dragData.y - e.pageY;
      matrixData[4] = dragData.dx - deltaX;
      matrixData[5] = dragData.dy - deltaY;
      this.setState({
        matrixData,
      });
      if (this.panContainer) {
        this.panContainer.style.transform = `matrix(${this.state.matrixData.toString()})`;
      }
    }
  };

  public render() {
    return (
      <div
        className="pan-container"
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
        style={{
          height: this.props.height,
        }}
        ref={(ref) => this.panWrapper = ref}
      >
        <div
          ref={(ref) => ref ? this.panContainer = ref : null}
          style={{
            transform: `matrix(${this.state.matrixData.toString()})`,
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
