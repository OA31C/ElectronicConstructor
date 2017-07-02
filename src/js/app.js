import '../css/main.css';

import * as settings from './settings.js';
import { Menu } from './menu.js';
import { LinesDrawer } from './utils/lines_drawer.js';


class App {

  constructor(canvasSelector) {
    // canvas init
    this.canvas = document.getElementById(canvasSelector);
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = this.canvas.getContext('2d');

    this.menu = new Menu(this.canvas);
    this.linesDrawer = new LinesDrawer(this.canvas, {width: () => this.getWidth()});
  }

  init() {
    this.initEvents();
    setInterval(() => this.mainLoop(), 1000 / settings.FPS);
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

  // FIXME: move it out of the class
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
    return this.canvas.width - this.menu.width;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
