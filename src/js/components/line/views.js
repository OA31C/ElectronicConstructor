import {canvasCtx} from '../../constants';
import {UIView} from '../../core/base/views';
import {Line} from './models';


/**
 * ...
 */
export class LineView extends UIView {
  /**
   * draw a point(like *) on input location
   */
  static renderInput(input: Object, color: string) {
    canvasCtx.beginPath();
    canvasCtx.arc(input.location.x, input.location.y, input.radius, 0, 2*Math.PI);
    canvasCtx.fillStyle = color;
    canvasCtx.fill();
  }

  /**
   * draw a point(like *) on output location
   */
  static renderOutput(output: Object, color: string) {
    canvasCtx.beginPath();
    canvasCtx.arc(output.location.x, output.location.y, output.radius, 0, 2*Math.PI);
    canvasCtx.fillStyle = color;
    canvasCtx.fill();
  }

  /**
   * ...
   */
  render(coordinates: Array<Line>, lineWidth: number, input: Object, output: Object, color: string) {
    canvasCtx.lineWidth = lineWidth;
    canvasCtx.beginPath();
    for (let i = 0, len = coordinates.length; i < len; i++) {
      let coordinate = coordinates[i];
      if (!i) { // first coordinate
        canvasCtx.moveTo(coordinate.x, coordinate.y);
        continue;
      }
      canvasCtx.lineTo(coordinate.x, coordinate.y);
    }
    canvasCtx.strokeStyle = color;
    canvasCtx.stroke();

    this.constructor.renderInput(input, color);
    this.constructor.renderOutput(output, color);
  }
}
