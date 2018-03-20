// @flow

const models = require('./base/models.js');

import {$canvas} from '../constants.js';
import {UIElement} from '../core/base/models.js';

/**
 * gets X and Y positions of mouse by its event
 */
export function getMousePos(event: MouseEvent): Location {
  let canvasRect = $canvas.getBoundingClientRect();
  return new models.Location(event.clientX - canvasRect.left,
                             event.clientY - canvasRect.top);
}

/**
 * ...
 */
export function isElementHover(element: UIElement, mousePos: Location): boolean {
  if (!element.isDisplayed || !element.location || !element.width || !element.height) {
    return false;
  }
  return (mousePos.x >= element.location.x) && (element.location.x + element.width >= mousePos.x) &&
         (mousePos.y >= element.location.y) && (element.location.y + element.height >= mousePos.y);
}
