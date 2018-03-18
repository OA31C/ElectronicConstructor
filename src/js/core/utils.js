// @flow

const constants = require('../constants.js');
const models = require('./base/models.js');

/**
 * gets X and Y positions of mouse by its event
 * @param  {MouseEvent} event
 * @return {Location}
 */
export function getMousePos(event: MouseEvent) {
  let canvasRect = constants.canvas.getBoundingClientRect();
  return new models.Location(event.clientX - canvasRect.left,
                             event.clientY - canvasRect.top);
};

/**
 * @param  {UIElement}  element
 * @param  {Location}  mousePos
 * @return {Boolean}
 */
export function isElementHover(element, mousePos: Object) {
  if (!element.isDisplayed || !element.location || !element.width || !element.height) {
    return false;
  };
  return (mousePos.x >= element.location.x) && (element.location.x + element.width >= mousePos.x) &&
         (mousePos.y >= element.location.y) && (element.location.y + element.height >= mousePos.y);
}
