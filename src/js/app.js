import '../css/main.css';

const constants = require('./constants.js');
import { Menu } from './menu.js';
import { LinesDrawer } from './utils/lines_drawer.js';


class App {

  constructor() {

    this.width  = 0;                       // type: Number
    this.height = 0;                       // type: Number

    this.menu        = null;               // type: Menu
    this.linesDrawer = null;               // type: LinesDrawer

    // canvas will have been redrawn when it's `false`
    this.isValidCanvasState = false;       // type: Boolean
  }

  init() {
    this._canvasSetup();

    this.menu        = new Menu(this);
    this.linesDrawer = new LinesDrawer(this, {width: () => this.getWidth()});  // TODO: move it to Edit mode class

    setInterval(() => this.mainLoop(), 1000 / constants.FPS);
  }

  _canvasSetup() {
    this.width  = window.innerWidth;
    this.height = window.innerHeight;

    this._qualitySetup();
  }

  _qualitySetup() {
    let devicePixelRatio = window.devicePixelRatio || 1;
    let backingStoreRatio = constants.canvasCtx.webkitBackingStorePixelRatio ||
                            constants.canvasCtx.mozBackingStorePixelRatio ||
                            constants.canvasCtx.msBackingStorePixelRatio ||
                            constants.canvasCtx.oBackingStorePixelRatio ||
                            constants.canvasCtx.backingStorePixelRatio || 1;
    let ratio = devicePixelRatio / backingStoreRatio;
    constants.canvas.width = this.width * ratio;
    constants.canvas.height = this.height * ratio;
    constants.canvas.style.width = this.width + 'px';
    constants.canvas.style.height = this.height + 'px';
    constants.canvasCtx.scale(ratio, ratio);
  }

  mainLoop() {
    this.redraw();
  }

  isElementHover(element, mousePos) {
    return (mousePos.x >= element.posX) && (element.posX + element.width >= mousePos.x) &&
           (mousePos.y >= element.posY) && (element.posY + element.height >= mousePos.y);
  }

  /**
   * returns dynamic width
   * @return {Number}
   */
  getWidth() {
    // TODO: move the method to drawing canvas class later.
    return this.width - this.menu.width;
  }

  clear() {
    constants.canvasCtx.clearRect(0, 0, this.width, this.height);
  }

  // move the method out of model class
  draw() {
    this.menu.draw();
    this.linesDrawer.draw();
  }

  redraw() {
    if (this.isValidCanvasState) return;
    this.clear();
    this.draw();
    this.isValidCanvasState = true;
  }

}

// remove it later
window.app = new App();
window.app.init();
