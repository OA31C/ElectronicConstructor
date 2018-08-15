// @flow

import {UICtrl} from './base/controllers.js';
import {$canvas} from '../constants.js';
import {redraw} from './utils';
import {App} from '../app.js';
import {canvasCtx, GRID_STEP} from '../constants';

/**
 * The main controller that contains all other controllers
 */
export class AppController {
  controllers: Array<UICtrl>;
  availableEvents: Array<string>;
  app: App;

  /**
   * [constructor description]
   */
  constructor(app) {
    // *** PROPERTIES ***
    this.controllers = [];
    this.availableEvents = ['onClick', 'onMouseMove', 'onMouseDown', 'onMouseUp'];
    this.app = app;

    // *** Initializations ***
    this.initAppEvents();
    this.handleEvents();

    this.loop();

    AppController.instance = this;
  }

  /**
   * change of space on resize
   */
  initAppEvents() {
    window.addEventListener('resize', () => this.onResizeWindow());
  }

  /**
   * resize canvas to current window size
   */
  onResizeWindow() {
    this.app.width = window.innerWidth;
    this.app.height = window.innerHeight;
    this.app.qualitySetup();
    redraw();
  }

  /**
   * add a controller to the list
   */
  addCtrl(ctrl) {
    this.controllers.push(ctrl);
  }

  /**
   * USAGE:
   * - add a handle method to a controller, name it like: `onMouseMove`
   * - the method receives one argument `event`
   * - the method should return Boolean value,
   *   that one specifies whether need to handle the event by another one controller
   */
  handleEvents() {
    for (const availableEvent of this.availableEvents) {
      let jsEventName = availableEvent.toLowerCase();
      // remove `on` from event name, like: onclick => click
      if (jsEventName.slice(0, 2) === 'on') {
        jsEventName = jsEventName.slice(2);
      }

      $canvas.addEventListener(jsEventName, (event) => {
        // sort controllers by priority
        const controllers = this.controllers.slice().sort((ctrl, ctrl2) => ctrl.model.priority < ctrl2.model.priority);
        for (const controller of controllers) {
          const controllerHandler = controller[availableEvent];
          if (!controllerHandler || typeof controllerHandler !== 'function') continue;

          const propagate = controllerHandler.bind(controller)(event);
          if (!propagate) break;
        }
      });
    }
  }

  /**
   * clean up whole the canvas
   */
  clear() {
    canvasCtx.clearRect(0, 0, this.app.width, this.app.height);
  }

  /**
   * draw background & grid
   */
  renderBackground() {
    // draw background
    canvasCtx.fillStyle = this.app.background;
    canvasCtx.fillRect(0, 0, this.app.width, this.app.height);

    // draw grid
    canvasCtx.lineWidth = 1;
    canvasCtx.strokeStyle = '#c7c7c7';
    canvasCtx.beginPath();
    // horizontal
    for (let i = 0; this.app.height > i; i+=GRID_STEP) {
      canvasCtx.moveTo(0, i);
      canvasCtx.lineTo(this.app.width, i);
    }
    // vertical
    for (let i = 0; this.app.width > i; i+=GRID_STEP) {
      canvasCtx.moveTo(i, 0);
      canvasCtx.lineTo(i, this.app.height);
    }
    canvasCtx.stroke();
  }

  /**
   * render all visible content
   */
  render() {
    // skip render if nothing has been changed
    if (redraw.isValidCanvasState) return;

    this.clear();
    this.renderBackground();
    // render elements
    for (const controller of this.controllers) {
      controller.render();
    }

    redraw.isValidCanvasState = true;
  }

  /**
   * update data for each tick
   */
  // update() {
  //   for (const ctrl of this.controllers) {
  //     ctrl.update();
  //   }
  // }

  /**
   * the main loop
   */
  loop() {
    // this.update();
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }
}
