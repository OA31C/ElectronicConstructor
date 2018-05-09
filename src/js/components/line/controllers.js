// @flow

import {UICtrl} from '../../core/base/controllers';
import {Line} from './models';
import {LineView} from './views';
import {getMousePos, redraw} from '../../core/utils';
import {$canvas} from '../../constants';

export class LineCtrl extends UICtrl {
  model: Line;
  view: LineView;

  render() {
    this.view.render(this.model.coordinates, this.model.lineWidth, this.model.input, this.model.output);
  }

  onMouseDown(event: MouseEvent): boolean {
    const mousePos = getMousePos(event);
    this.model.setHold(mousePos);
    return true;
  }

  onMouseMove(event: MouseEvent): boolean {
    const mousePos = getMousePos(event);
    // set cursor
    if (this.model.isInputHover(mousePos) || this.model.isOutputHover(mousePos)) {
      const hoverCursor = 'pointer';
      // save the cursor that was before hoverCursor
      this.prevCursor = $canvas.style.cursor !== hoverCursor ? $canvas.style.cursor : this.prevCursor;
      $canvas.style.cursor = hoverCursor;
    } else if (!this.model.hold) {
      $canvas.style.cursor = this.prevCursor;
    }
    // update line
    if (this.model.update(mousePos)) redraw();
    return true;
  }

  onMouseUp(event: MouseEvent): boolean {
    this.model.hold = false;
    return true;
  }
}
