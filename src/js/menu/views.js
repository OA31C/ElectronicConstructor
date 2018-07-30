// @flow

import {canvasCtx} from '../constants.js';
import {UIElement} from '../core/base/models.js';
import {UIView} from '../core/base/views.js';
import {Menu, MenuItem, MenuButton} from './models.js';
import {capitalize, drawImage, strokeInside, strokeOutside} from '../core/utils';
import {ELEMENTS} from '../components';

/**
 * ...
 */
export class MenuView extends UIView {
  /**
   * render menu and its items
   */
  render(menu: Menu) {
    if (menu.isDisplayed) {
        this.constructor.drawBackground(menu);
        menu.items.forEach((item, index) => {
            this.constructor.renderItem(item, ++index, menu);
        });
    }

    for (const button of MenuButton.instances) {
        this.constructor.renderButton(button);
    }
    this.constructor.drawBorder(menu);
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
  static drawBorder(element: Menu) {
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
        strokeInside(element, element.borderWidth);
    }
  }

  /**
   * [renderItem description]
   * @param  {[type]} item:       MenuItem      [description]
   * @param  {[type]} itemNum: number        [description]
   * @param {{type}} menu: Menu
   */
  static renderItem(item: MenuItem, itemNum: number, menu: Menu) { // FIXME: remove menu here!!!
    if (!item.isDisplayed) return;

    canvasCtx.fillStyle = item.textColor;
    canvasCtx.font = `${item.font} ${item.textSize}px ${item.textFont}`;
    if (item.isSelected) {
        canvasCtx.font = `bold ${canvasCtx.font}`;
    }
    canvasCtx.textAlign = item.textAlign;

    // center by width of the item rect
    let posX = item.location.x + item.iconWidth * 1.3;

    // concatenates font sizes of all items above and current + concatenates top margin of all items above and current
    let posY = item.height * itemNum;

    const textWidth = canvasCtx.measureText(capitalize(item.element)).width + posX;
    const textHeight = posY - 15;

    // item background
    this.drawBackground(item);

    // item title
    canvasCtx.fillStyle = item.textColor;
    canvasCtx.fillText(capitalize(item.element), posX, textHeight);

    // item description
    canvasCtx.font = 'normal 14px Helvetica';
    canvasCtx.fillText(item.description, textWidth, textHeight);

    // render icon item
    ELEMENTS[item.element].view.renderIcon(item.iconLocation, item.iconWidth, item.height);
    // button Line in item
    if (item.isHovered) {
        canvasCtx.strokeStyle = menu.borderColor;
        strokeOutside(item, menu.borderWidth);
    } else {
      canvasCtx.beginPath();
      canvasCtx.strokeStyle = menu.borderColor;
      canvasCtx.lineWidth = menu.borderWidth;
      const bottomLineMargin = (item.width * 0.05) / 2; // cut 5% off from the whole line width
      const bottomLinePosY = item.location.y + item.height + menu.borderWidth / 2;
      canvasCtx.moveTo(item.location.x + bottomLineMargin, bottomLinePosY);
      canvasCtx.lineTo(item.location.x + item.width - bottomLineMargin, bottomLinePosY);
      canvasCtx.stroke();
    }
  }

  /**
   * Paint Menu Button
   */
  static renderButton(button: MenuButton) {
    if (!button.isDisplayed) return;
      drawImage(button.img, button.location.x, button.location.y, button.width, button.height);
  }
}
