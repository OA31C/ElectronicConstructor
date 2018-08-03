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
      this.constructor.drawBorder(menu);
      menu.items.forEach((item) => {
        this.constructor.renderItem(item, menu);
      });
    }
    for (const button of MenuButton.instances) {
      this.constructor.renderButton(button);
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
  static renderItem(item: MenuItem, menu: Menu) { // FIXME: remove menu here!!!
    if (!item.isDisplayed) return;

    canvasCtx.fillStyle = item.textColor;
    canvasCtx.font = `${item.font} ${item.textSize}px ${item.textFont}`;
    canvasCtx.textAlign = item.textAlign;

    // center by width of the item rect
    let posXItemText = item.location.x + item.iconWidth * item.iconMargin;

    // concatenates font sizes of all items above and current + concatenates top margin of all items above and current
    let posYItemText = item.height + item.location.y;

    const textWidth = canvasCtx.measureText(capitalize(item.element)).width + posXItemText;
    const textHeight = posYItemText - item.topMargin;

    // item background
    this.drawBackground(item);

    // item title
    canvasCtx.fillStyle = item.textColor;
    canvasCtx.fillText(capitalize(item.element), posXItemText, textHeight);

    // item description
    canvasCtx.font = item.fontDescription;
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
