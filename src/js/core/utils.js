const constants = require('../constants.js');
const models    = require('./models.js');

/**
 * gets X and Y positions of mouse by its event
 * @param  {MouseEvent} event
 * @return {Location}
 */
export function getMousePos(event) {
  let canvasRect = constants.canvas.getBoundingClientRect();
  return new models.Location(event.clientX - canvasRect.left,
                             event.clientY - canvasRect.top)
};

/**
 * @param  {UIElement}  element
 * @param  {Location}  mousePos
 * @return {Boolean}
 */
export function isElementHover(element, mousePos) {
  if (!element.isDisplayed || !element.location || !element.width || !element.height) {
    return false;
  };
  return (mousePos.x >= element.location.x) && (element.location.x + element.width >= mousePos.x) &&
         (mousePos.y >= element.location.y) && (element.location.y + element.height >= mousePos.y);
}

// FIXME: ???
export function drawTextByCenter(element) {
    return;
}

/**
 * @param  {UIElement} element [description]
 * @return {Array}  [location, height, width]
 */
export function getTheNearestFreeSpace(element) {
    let parent = element.parent,
        x      = parent.location.x,
        y      = parent.location.y,
        height = 0,
        width  = 0;

    element.parent.children.forEach(child => {
        if (child === element) return;  // skip elemets after the current one
        if (child.isDisplayed) {
            x += child.location.x;
            y += child.location.y;
        };
    });
    return [new models.Location(x, y), height, width];
}
