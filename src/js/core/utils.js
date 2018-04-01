// @flow

import {Location} from './base/models';
import {$canvas} from '../constants';
import {UIElement} from '../core/base/models';

/**
 * gets X and Y positions of mouse by its event
 */
export function getMousePos(event: MouseEvent): Location {
  const canvasRect = $canvas.getBoundingClientRect();
  return new Location(event.clientX - canvasRect.left, event.clientY - canvasRect.top);
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

/**
 * say to App that need to redraw the canvas
 */
export function redraw() {
  redraw.isValidCanvasState = false;
}
