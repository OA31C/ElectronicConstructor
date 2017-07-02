import '../css/main.css';

import * as settings from './settings.js';
import { Menu } from './menu.js';
import { LinesDrawer } from './utils/lines_drawer.js';


class App {

  constructor(canvasSelector) {
    this.canvasSelector = canvasSelector;  // type: String

    this.canvas = null;                    // type: HTMLCanvasElement
    this.ctx    = null;                    // type: CanvasRenderingContext2D
    this.width  = 0;                       // type: Number
    this.height = 0;                       // type: Number

    this.menu        = null;               // type: Menu
    this.linesDrawer = null;               // type: LinesDrawer
  }

  init() {
    this._canvasSetup();
    this.initEvents();

    this.menu        = new Menu(this);
    this.linesDrawer = new LinesDrawer(this, {width: () => this.getWidth()});  // TODO: move it to Edit mode class

    setInterval(() => this.mainLoop(), 1000 / settings.FPS);
  }

  _canvasSetup() {
    this.canvas = document.getElementById(this.canvasSelector);
    this.ctx = this.canvas.getContext('2d');
    this.width  = window.innerWidth;
    this.height = window.innerHeight;

    this._qualitySetup();
  }

  _qualitySetup() {
    let devicePixelRatio = window.devicePixelRatio || 1;
    let backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
                            this.ctx.mozBackingStorePixelRatio ||
                            this.ctx.msBackingStorePixelRatio ||
                            this.ctx.oBackingStorePixelRatio ||
                            this.ctx.backingStorePixelRatio || 1;
    let ratio = devicePixelRatio / backingStoreRatio;
    this.canvas.width = this.width * ratio;
    this.canvas.height = this.height * ratio;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.scale(ratio, ratio);
  }

  initEvents() {
    this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvas.addEventListener('dblclick', (e) => this.onDoubleClick(e));
    this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
  }

  mainLoop() {
    this.redraw();
  }

  onMouseMove(event) {
    let mousePos = this.getMousePos(event);
  }

  onDoubleClick(event) {
    let mousePos = this.getMousePos(event);
  }

  onMouseDown(event) {

  }

  onMouseUp(event) {

  }

  isElementHover(element, mousePos) {
    return (mousePos.x >= element.posX) && (element.posX + element.width >= mousePos.x) &&
           (mousePos.y >= element.posY) && (element.posY + element.height >= mousePos.y);
  }

  getMousePos(event) {
    let canvasRect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - canvasRect.left,
      y: event.clientY - canvasRect.top
    }
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
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  draw() {
    this.menu.draw();
    this.linesDrawer.draw();
  }

  redraw() {
    this.clear();
    this.draw();
  }

}

// remove it later
window.app = new App('app');
window.app.init();
