// @flow

import {UICtrl} from '../../core/base/controllers';
import {LinesDrawer} from './models';
import {LinesDrawerView} from './views';
import {getMousePos} from '../../core/utils';

/**
 * ...
 */
export class LinesDrawerCtrl extends UICtrl {
  model: LinesDrawer;
  view: LinesDrawerView;

  /**
   * ...
   */
  render() {
    for (const line of this.model.lines) {
      this.view.render(line.coordinates);
    }
  }

  /**
   * ...
   */
  onMouseDown(event: MouseEvent): boolean {
    const mousePos = getMousePos(event);
    if (this.model.isInRect(mousePos)) {
      this.model.hold();
      this.model.lines.add(mousePos);
    }
    return true;
  }

  /**
   * ...
   */
  onMouseMove(event: MouseEvent): boolean {
    if (!this.model.isHold) return true;
    const mousePos = getMousePos(event);
    if (this.model.isInRect(mousePos)) {
      this.model.lines.update(mousePos);
    }
    return true;
  }

  /**
   * ...
   */
  onMouseUp(event: MouseEvent): boolean {
    this.model.unhold();
    const theLatestLine = this.model.lines[this.model.lines.length - 1];
    // remove the latest line, if there's only one or no coordinate in the line
    if (theLatestLine && theLatestLine.coordinates.length <= 1) {
      this.model.lines.pop();
    }
    return true;
  }
}
