const constants = require('../constants.js');
const models = require('./models.js');

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
