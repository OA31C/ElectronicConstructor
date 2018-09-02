// @flow

import {UICtrl} from '../core/base/controllers';
import {getMousePos, isElementHover, isRectHover, redraw} from '../core/utils';
import {Menu, MenuButton} from './models';
import {$canvas} from '../constants';
import {createElement} from '../components';

/**
 * ...
 */
export class MenuCtrl extends UICtrl {
  model: Menu;
  // view: MenuView;

  /**
   * onClick description
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
    for (const item of this.model.items) {
      if (isElementHover(item, mousePosition)) {
        item.focus = true;
        break;
      }
    }

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

      if (item.focus) {
        mousePosition.x = mousePosition.x - item.iconWidth/2;
        mousePosition.y = mousePosition.y - item.iconHeight/2;
        item.locationElement = mousePosition;
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
  onMouseUp(event: MouseEvent): boolean {
    const mousePosition = getMousePos(event);
    this.model.isResizeHold = false;
    for (const item of this.model.items) {
      if (item.focus) {
        if (isRectHover(app.workingSpace, mousePosition)) {
          mousePosition.x = mousePosition.x - item.iconWidth/2;
          mousePosition.y = mousePosition.y - item.iconHeight/2;
          createElement(item.element, {location: mousePosition});
        }
        redraw();
        item.focus = false;
      }
    }
    return true;
  }
}
