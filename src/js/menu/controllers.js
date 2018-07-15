// @flow

import {UICtrl} from '../core/base/controllers';
import {getMousePos, isElementHover, redraw} from '../core/utils';
import {Menu, MenuButton, MenuItem} from './models';
import {$canvas, canvasCtx, DEFAULT_CURSOR} from '../constants';
import {MenuView} from "./views";
import {Location} from "../core/base/models";

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
        return false;
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
    } else $canvas.style.cursor = DEFAULT_CURSOR;

    for (let item of this.model.items) {
      if (item.isHover(mousePosition)) {
        item.hold();
      } else {
        item.unhold();
      }
    }

    if (this.model.isResizeHold) {
      $canvas.style.cursor = 'col-resize';
      this.model.width = this.model.width + this.model.location.x - mousePosition.x;
      // console.log(`${this.model.width} its this model width`)

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
    if (this.model.isResizeHold) {
      $canvas.style.cursor = DEFAULT_CURSOR;
    }
    this.model.isResizeHold = false;
    return true;
  }
}
