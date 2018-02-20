const constants = require('../constants.js');
const coreUtils = require('../core/utils.js');

export class LinesDrawer {

  constructor(app, rect={}, lineWidth=2, lineColor='#000000') {

    this.app = app;

    this.posX = rect.posX || 0;
    this.posY = rect.posY || 0;
    this._width = rect.width || constants.canvas.width;
    this.height = rect.height || constants.canvas.height;

    this.lineWidth = lineWidth;
    this.lineColor = lineColor;

    // true: when user has clicked on canvas and he hasn't set loose it yet
    // AND user's mouse isn't out of the rect
    this.isHold = false;

    // true: when user has clicked by any of drawn line
    this.isSelected = false;

    // all drawn lines are keeped here
    this.linesList = new LinesList(this.app);

    this.init();

  }

  init() {
    constants.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    constants.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    constants.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
  }

  get width() {
    return typeof this._width === 'function' ? this._width() : this._width;
  }

  onMouseMove(event) {
    let mousePos = coreUtils.getMousePos(event);
    if (this.isHold && this.isInRect(mousePos)) {
      this.linesList.update(mousePos);
    };
  }

  onMouseDown(event) {
    let mousePos = coreUtils.getMousePos(event);
    if (this.isInRect(mousePos)) {
      this.isHold = true;
      this.linesList.addNew(mousePos);
    };
  }

  onMouseUp(event) {
    this.isHold = false;

    // remove the last line, if there's only one or no coordinate
    if (this.linesList.lines[this.linesList.length - 1].coordinates.length <= 1) {
      this.linesList.pop();
    };
  }

  isInRect(mousePos) {
    return (mousePos.x >= this.posX) && (this.posX + this.width >= mousePos.x) &&
           (mousePos.y >= this.posY) && (this.posY + this.height >= mousePos.y);
  }

  draw() {
    this.linesList.draw();
  }

}


class LinesList {

  constructor(app, ...lines) {

    this.app = app;
    this.lines = lines;  // [Line]

  }

  addNew(mousePos) {
    this.lines.push(new Line(this.app, mousePos));
  }

  update(mousePos) {
    this.lines[this.length - 1].update(mousePos);
  }

  draw() {
    this.forEach(line => line.draw());
  }

  /**
   * @param  {Function} callback : takes 2 arguments (currentValue, index)
   */
  forEach(callback) {
    for (let i = 0, len = this.lines.length; i < len; i++) {
      callback(this.lines[i], i);
    }
  }

  pop() {
    this.lines.pop();
  }

  get length() {
    return this.lines.length;
  }

}


class Line {

  constructor(app, mousePos) {

    this.app = app;

    this.coordinates = [{x: mousePos.x, y: mousePos.y}];
    this.width = 0;  // FIXME: use it
  }

  update(mousePos) {
    // 1) skip this coordinate when it's the same as last saved one
    if (this.coordinates.length) {
      let lastCoordinate = this.coordinates[this.coordinates.length - 1];
      if (lastCoordinate.x === mousePos.x && lastCoordinate.y === mousePos.y) return;
    };

    // 2) add a new coordinate everytime
    this.coordinates.push(mousePos);

    // 3) check last three coordinates
    // -------------------------------
    if (this.coordinates.length < 3) {
      this.app.isValidCanvasState = false;
      return;
    };

    let lastThreeCoordinates = this.coordinates.slice(-3);

    // * if it's a straight line, like: ---, or: |
    //                                           |
    // - remove the second coordinate
    if ((lastThreeCoordinates[0].x === lastThreeCoordinates[1].x && lastThreeCoordinates[0].x === lastThreeCoordinates[2].x) ||
        (lastThreeCoordinates[0].y === lastThreeCoordinates[1].y && lastThreeCoordinates[0].y === lastThreeCoordinates[2].y)) {
      this.coordinates.splice(-2, 1);
    }

    // TODO: optimization
    // add checks lines like this /
    //                           /
    // -------------------------------
    this.app.isValidCanvasState = false;
  }

  draw() {
    constants.canvasCtx.beginPath();
    for (let i = 0, len = this.coordinates.length; i < len; i++) {
      let coordinate = this.coordinates[i];
      if (!i) {  // first coordinate
        constants.canvasCtx.moveTo(coordinate.x, coordinate.y);
        continue;
      };
      constants.canvasCtx.lineTo(coordinate.x, coordinate.y);
    };
    constants.canvasCtx.stroke();
  }

}
