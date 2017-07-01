
export class LinesDrawer {

  constructor(canvas, rect={}, lineWidth=2, lineColor='#000000') {

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.posX = rect.posX || 0;
    this.posY = rect.posY || 0;
    this.width = rect.width || this.canvas.width;
    this.height = rect.height || this.canvas.height;

    this.lineWidth = lineWidth;
    this.lineColor = lineColor;

    // true: when user has clicked on canvas and he hasn't set loose it yet
    // and user's mouse isn't out of the rect
    this.isHold = false;

    // true: when user has clicked by any of drawn line
    this.isSelected = false;

    // all drawn lines are keeping here
    this.linesList = new LinesList(this.ctx);

    this.init();

  }

  init() {
    this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
  }

  onMouseMove(event) {
    if (this.isHold) {
      this.linesList.update(this.getMousePos(event));
    };
  }

  onMouseDown(event) {
    let mousePos = this.getMousePos(event);
    this.isHold = true;
    this.linesList.addNew(mousePos);
  }

  onMouseUp(event) {
    this.isHold = false;

    // TODO: remove the last line, if there's only one coordinate
  }

  // FIXME: move it out of the class
  getMousePos(event) {
    let canvasRect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - canvasRect.left,
      y: event.clientY - canvasRect.top
    }
  }

  draw() {
    this.linesList.draw();
  }

}


class LinesList {

  constructor(ctx, ...lines) {

    this.ctx = ctx;
    this.lines = lines;  // [Line]

  }

  addNew(mousePos) {
    this.lines.push(new Line(this.ctx, mousePos));
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

  get length() {
    return this.lines.length;
  }

}


class Line {

  constructor(ctx, mousePos) {

    this.ctx = ctx;

    this.coordinates = [{x: mousePos.x, y: mousePos.y}];  // [{x, y}]
    this.width = 0;
  }

  update(mousePos) {

    // 1) if only coordinate: add a new coodinate
    if (this.coordinates.length === 1) {
      this.coordinates.push(mousePos);
      return;
    };

    let lastCoordinate = this.coordinates[this.coordinates.length - 1];

    // FIXME: change the algorithm to:
    // - write coordinates some every pixels (like 5)
    // - check all coordinates of the line and if there're some straight lines:
    //   * remove coordinates which are between start and end
    //   like:    -------
    //   or/and:  |
    //            |
    //   or/and: /
    //          /

    // 2) if x OR y of last coordinate HASN'T been changed: update the last coordinate
    if (lastCoordinate.x === mousePos.x) {
      lastCoordinate.y = mousePos.y;
      return;
    };
    if (lastCoordinate.y === mousePos.y) {
      lastCoordinate.x = mousePos.x;
      return;
    };

    // 3) if x AND y of last coordinate HAS been changed: add a new coordinate
    if (lastCoordinate.x !== mousePos.x && lastCoordinate.y !== mousePos.y) {
      this.coordinates.push(mousePos);
      return;
    }

    // 4) something has gone wrong - log error
    console.error(`Could not recognize action.
      mousePos: ${JSON.stringify(mousePos)},
      lastCoordinate: ${JSON.stringify(lastCoordinate)},
      coordinates count: ${this.coordinates.length}`
    );

  }

  draw() {
    this.ctx.beginPath();
    for (let i = 0, len = this.coordinates.length; i < len; i++) {
      let coordinate = this.coordinates[i];
      if (!i) {  // first coordinate
        this.ctx.moveTo(coordinate.x, coordinate.y);
        continue;
      };
      this.ctx.lineTo(coordinate.x, coordinate.y);
    };
    this.ctx.stroke();
  }

}
