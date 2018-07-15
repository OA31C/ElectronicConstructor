import {canvasCtx} from '../../constants';
import {UIView} from '../../core/base/views';
import {Line} from './models';
import {DEFAULT_LINE_WIDTH} from './models';
import {Location} from '../../core/base/models';

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
    LineView.renderLine(coordinates, lineWidth, input, output, color);
  }

  /**
   * render static method Line
   */
  static renderLine(coordinates: Array<Line>, lineWidth: number, input: Object, output: Object, color: string) {
    canvasCtx.lineWidth = DEFAULT_LINE_WIDTH;
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

    LineView.renderInput(input, color);
    LineView.renderOutput(output, color);
  }

  /**
   * render icon on menu item
   */
  static renderIcon(location: Location, width, height) {
    // canvasCtx.fillRect(location.x, location.y, width, height);
    let px = location.x + 30/2;
    let py = location.y + 45/2;
    let array = [new Location(location.x + 10, location.y + 25), new Location(location.x + 42, location.y + 25)];
    LineView.renderLine(array, DEFAULT_LINE_WIDTH,
        {location: array[0], radius: DEFAULT_LINE_WIDTH+1},
        {location: array[array.length-1], radius: DEFAULT_LINE_WIDTH+1},
        'black',
        );
  }
}
