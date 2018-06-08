// @flow

import {UICtrl} from '../../core/base/controllers';
import {Line} from './models';
import {LineView} from './views';
import {getMousePos, redraw} from '../../core/utils';
import {$canvas, DEFAULT_CURSOR} from '../../constants';

export class LineCtrl extends UICtrl {
  model: Line;
  view: LineView;

  render() {
    this.view.render(
      this.model.coordinates, this.model.lineWidth, this.model.input, this.model.output, this.model.color
    );
  }

  onMouseDown(event: MouseEvent): boolean {
    const mousePos = getMousePos(event);
    return !this.model.setHold(mousePos);
  }

  onMouseMove(event: MouseEvent): boolean {
    const mousePos = getMousePos(event);
    const isHover = this.model.isInputHover(mousePos) || this.model.isOutputHover(mousePos);
    // set cursor
    if (isHover || this.model.hold) {
      $canvas.style.cursor = 'crosshair';
    } else {
      $canvas.style.cursor = DEFAULT_CURSOR;
    }
    // update line
    if (this.model.update(mousePos)) {
      redraw();
      return false;
    }
    return !isHover && !this.model.hold;
  }

  onMouseUp(event: MouseEvent): boolean {
    if (this.model.hold) {
      $canvas.style.cursor = DEFAULT_CURSOR;
    }
    this.model.hold = false;
    return true;
  }
}
