// @flow

import {UICtrl} from '../core/base/controllers';
import {getMousePos, isElementHover, redraw} from '../core/utils';
import {Menu, MenuButton} from './models';
import {$canvas} from '../constants';


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
      if (button.onClick && isElementHover(button, mousePosition)) {
        button.onClick();
      }
    }
  }

  /**
  * Resize Width in Menu
  */
  onMouseDown(event: MouseEvent): boolean {
    const mousePosition = getMousePos(event);
    if (this.model.isBorderHover(mousePosition.x, this.model.location.x)) {
      this.model.isResizeHold = true;
    } else return true;
  }

  /**
  * the mouse is moving in menu
  */
  onMouseMove(event: MouseEvent): boolean {
    const mousePosition = getMousePos(event);

    if (this.model.isDisplayed && this.model.isBorderHover(mousePosition.x, this.model.location.x)) {
      $canvas.style.cursor = 'col-resize';
      // FIXME: remove *return* when the method won't be raised while cursor is not in menu rect
      return false;
    }
    for (const item of this.model.items) {
      if (item.isHover(mousePosition)) {
        item.hover();
      } else {
        item.unhover();
      }
    }

    if (this.model.isResizeHold) {
      $canvas.style.cursor = 'col-resize';
      this.model.width = this.model.width + this.model.location.x - mousePosition.x;
      redraw();
      // hides the menu
      if (this.model.width <= this.model.defaultWidth / 4) {
        this.model.hide();
      } else if (!this.model.isDisplayed) {
        this.model.show();
      }
    } else return true;
  }
  /**
   * the mouse is up in menu
   */
  onMouseUp() {
    this.model.isResizeHold = false;
    return true;
  }
}
