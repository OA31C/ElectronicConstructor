import '../css/main.css';

import * as settings from './settings.js'
import { Menu } from './menu.js'


class App {

  constructor(canvasSelector) {
    // canvas init
    this.canvas = document.getElementById(canvasSelector);
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = this.canvas.getContext('2d');

    this.menu = new Menu(this.canvas);
  }

  init() {
    // this.initEvents();
    // setInterval(() => this.mainLoop(), 1000 / settings.FPS);
  }

  initEvents() {
    this.canvas.onmousemove = (e) => this.onMouseMove(e);
    this.canvas.ondblclick = (e) => this.onDoubleClick(e);
    this.canvas.onmousedown = (e) => this.onMouseDown(e);
    this.canvas.onmouseup = (e) => this.onMouseUp(e);
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
    let mousePos = this.getMousePos(event);
  }

  onMouseUp(event) {
    this.deselectElements();
    this.canvas.style.cursor = 'default';
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


  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    
  }

  redraw() {
    this.clear();
    this.draw();
  }

}

let app = new App('app');
app.init();
