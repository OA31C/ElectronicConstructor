// @flow

import {UICtrl} from '../../core/base/controllers';
import {getMousePos, isElementHover, redraw} from '../../core/utils';
import {Menu, MenuButton} from './models';
import {$canvas} from '../../constants';
import {hoverCursor} from '../line/controllers';
/**
 * ...
 */
export class MenuCtrl extends UICtrl {
  model: Menu;
  // view: MenuView;

  /**
   * [onClick description]
   */
  onClick(event: MouseEvent): boolean {
    const mousePosition = getMousePos(event);

    // redirect the event to menu buttons
    for (const button of MenuButton.instances) {
      if (isElementHover(button, mousePosition)) {
        button.onClick && button.onClick();
      }
    }
    // FIXME: check is mouse in menu rect. Return `true` otherwise
    for (const item of this.model.items) {
      if (item.isHover(mousePosition)) {
        item.select();
      } else {
        item.deselect();
      }
      redraw();
    }
    return true;
  }

  /**
   * Resize Width in Menu
  */
  onMouseDown(event: MouseEvent): boolean {
    let mousePosition = getMousePos(event);
    if (this.checkCloseEnough(mousePosition.x, this.model.location.x)) {
      this.model.isResizeHold = true;
    } else return true;
  }

  onMouseMove(event: MouseEvent): boolean {
    let mousePosition = getMousePos(event);
    const colResize = 'col-resize';
    this.prevCursor = $canvas.style.cursor !== colResize ? $canvas.style.cursor : this.prevCursor;

    if (this.checkCloseEnough(mousePosition.x, this.model.location.x)) {
      $canvas.style.cursor = colResize;
      return false;
    } else $canvas.style.cursor = this.prevCursor;

    if (this.model.isResizeHold) {
      $canvas.style.cursor = colResize;
      let resize = mousePosition.x;
      let resizeWidth = this.model.width + this.model.location.x - resize;
      this.model.width = resizeWidth;

      redraw();

      // hides the menu
      if (this.model.width <= 4) {
        this.model.hide();
        this.model.width = this.model.getParentWidth() / this.model.partOfCanvas;
      }
    } else return true;
  }

  onMouseUp(event: MouseEvent): boolean {
    this.model.isResizeHold = false;
    return true;
  }

  /**
   * Check if mouse position x is close to menu border
   */
  checkCloseEnough(mouseX, elementLocationX) {
    return Math.abs(mouseX - elementLocationX) < this.model.borderWidth;
  }
}
