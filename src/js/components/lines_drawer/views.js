import {canvasCtx} from '../../constants';
import {UIView} from '../../core/base/views';
import {Line} from './models';


/**
 * ...
 */
export class LinesDrawerView extends UIView {
  /**
   * ...
   */
  render(coordinates: Array<Line>) {
    canvasCtx.beginPath();
    for (let i = 0, len = coordinates.length; i < len; i++) {
      let coordinate = coordinates[i];
      if (!i) { // first coordinate
        canvasCtx.moveTo(coordinate.x, coordinate.y);
        continue;
      }
      canvasCtx.lineTo(coordinate.x, coordinate.y);
    }
    canvasCtx.stroke();
  }
}
