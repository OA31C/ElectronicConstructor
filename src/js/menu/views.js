// @flow

<<<<<<< HEAD:src/js/components/menu/views.js
import {canvasCtx} from '../../constants.js';
import {Location, UIElement} from '../../core/base/models.js';
import {UIView} from '../../core/base/views.js';
import {Menu, MenuItem, MenuButton} from './models.js';
import {drawImage} from '../../core/utils';
=======
import {canvasCtx} from '../constants.js';
import {Location, UIElement} from '../core/base/models.js';
import {UIView} from '../core/base/views.js';
import {Menu, MenuItem, MenuButton} from './models.js';
import {drawImage} from '../core/utils';
>>>>>>> e22fd340982ae6365c109bc195d7d3ca3ddb3d93:src/js/menu/views.js

/**
 * ...
 */
export class MenuView extends UIView {
  /**
   * render menu and its items
   */
  render(menu: Menu) {
    if (menu.isDisplayed) {
<<<<<<< HEAD:src/js/components/menu/views.js
      this.drawBackground(menu);
      this.drawBorder(menu);
=======
      this.constructor.drawBackground(menu);
      this.constructor.drawBorder(menu);
>>>>>>> e22fd340982ae6365c109bc195d7d3ca3ddb3d93:src/js/menu/views.js
      menu.items.forEach((item, index) => {
        this.renderItem(item, ++index, menu);
        });
    }

    for (const button of MenuButton.instances) {
<<<<<<< HEAD:src/js/components/menu/views.js
        this.renderButton(button);
=======
        this.constructor.renderButton(button);
>>>>>>> e22fd340982ae6365c109bc195d7d3ca3ddb3d93:src/js/menu/views.js
    }
  }

  /**
  * @param  {Menu | MenuItem} element
  */
  static drawBackground(element: UIElement) {
    if (!element.background) return;
    canvasCtx.fillStyle = element.background;
    canvasCtx.fillRect(element.location.x, element.location.y, element.width, element.height);
  }

  /**
  * @param  {Menu | MenuItem} element
  */
  static drawBorder(element: UIElement) {
    let isBorder = false;
    if (element.borderWidth) {
      canvasCtx.lineWidth = element.borderWidth;
      isBorder = true;
    }
    if (element.borderColor) {
      canvasCtx.strokeStyle = element.borderColor;
      isBorder = true;
    }
    if (isBorder) {
      canvasCtx.strokeRect(element.location.x, element.location.y, element.width, element.height);
    }
  }

  /**
   * [renderItem description]
   * @param  {[type]} item:       MenuItem      [description]
   * @param  {[type]} itemNum: number        [description]
   */
  renderItem(item: MenuItem, itemNum: number, menu: Menu) { // FIXME: remove menu here!!!
    if (!item.isDisplayed) return;
    this.constructor.drawBackground(item);
    this.constructor.drawBorder(item);

    canvasCtx.fillStyle = item.textColor;
    canvasCtx.font = `${item.textSize}px ${item.textFont}`;
    if (item.isSelected) {
      canvasCtx.font = `bold ${canvasCtx.font}`;
    }
    canvasCtx.textAlign = item.textAlign;

    // center by width of the item rect
    // FIXME: add `if` for check whether textAlign === center
    let posX = menu.location.x + menu.width / 2;
    // concatenates font sizes of all items above and current + concatenates top margin of all items above and current
    let posY = item.textSize * itemNum + item.topMargin * itemNum;

    canvasCtx.fillText(item.text, posX, posY);

    item.width = canvasCtx.measureText(item.text).width;
    item.height = item.textSize;

    // FIXME: should it be in drawElement method maybe? before drawBackground
    // FIXME: remove it
    // use the next algorithm:
    // 1) if item doesn't have location:
    //   - set location to the nearest X, Y:
    //     * where it isn't filled by another item
    //     * check whether height and width also isn't filled
    //     + top and left margin
    // ...

    // TODO: get X position for centered text item
    let x = menu.location.x + (menu.width / 2) - (item.width / 2);
    let y = posY-item.textSize;
    item.location = new Location(x, y);
  }

  /**
   * Paint Menu Button
   */
<<<<<<< HEAD:src/js/components/menu/views.js
  renderButton(button: MenuButton) {
=======
  static renderButton(button: MenuButton) {
>>>>>>> e22fd340982ae6365c109bc195d7d3ca3ddb3d93:src/js/menu/views.js
    if (!button.isDisplayed) return;
    drawImage(button.img, button.location.x, button.location.y, button.width, button.height);
  }
}

