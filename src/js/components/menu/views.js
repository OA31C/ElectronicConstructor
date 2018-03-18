// @flow

import {canvasCtx} from '../../constants.js';
import {Location, UIElement} from '../../core/base/models.js';
import {UIView} from '../../core/base/views.js';
import {Menu, MenuItem} from './models.js';


/**
 * ...
 */
export class MenuView extends UIView {
  /**
   * render menu and its items
   * @param  {UIElement} menu : menu that's needed to draw and its items
   */
  render(menu: Menu) {
    if (!menu.isDisplayed) return;
    this.drawBackground(menu);
    this.drawBorder(menu);

    // render items
    menu.items.forEach((item, index) => {
      this.renderItem(item, ++index, menu);
    });
  }

  /**
  * @param  {UIElement} element
  */
  drawBackground(element: UIElement) {
    if (!element.background) return;
    canvasCtx.fillStyle = element.background;
    canvasCtx.fillRect(element.location.x, element.location.y, element.width, element.height);
  }

  /**
  * @param  {UIElement} element
  */
  drawBorder(element: UIElement) {
    let isBorder = false;
    if (element.borderWidth) {
      canvasCtx.lineWidth = element.borderWidth;
      isBorder = true;
    };
    if (element.strokeStyle) {
      canvasCtx.strokeStyle = element.borderColor;
      isBorder = true;
    };
    if (isBorder) {
      canvasCtx.strokeRect(element.location.x, element.location.y, element.width, element.height);
    };
  }

  /**
   * [renderItem description]
   * @param  {[type]} item:       MenuItem      [description]
   * @param  {[type]} itemNum: number        [description]
   */
  renderItem(item: MenuItem, itemNum: number, menu: Menu) { // FIXME: remove menu here!!!
    if (!item.isDisplayed) return;
    this.drawBackground(item);
    this.drawBorder(item);

    canvasCtx.fillStyle = item.textColor;
    canvasCtx.font = `${item.textSize}px ${item.textFont}`;
    if (item.isSelected) { // FIXME
      canvasCtx.font = "bold " + canvasCtx.font;
    };
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
    // 1) if item doesn't have locatilocationon:
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
};
