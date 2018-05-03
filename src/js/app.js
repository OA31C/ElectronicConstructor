// @flow

import '../css/main.css';

import {$canvas, canvasCtx, gridStep} from './constants';
import {AppController} from './core/app_controller';
import {Location} from './core/base/models';
import {redraw} from './core/utils';
import {createElement} from './components';

/**
 * ...
 */
class App {
  background: string;
  controller: AppController;
  width: number;
  height: number;
  workingSpace: Object;

  /**
   * initializates default properties and starts main loop
   */
  constructor() {
    // *** PROPERTIES ***
    this.background = '#e3e172';
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    // rect without including menu or navigation
    this.workingSpace = {'height': this.height, 'width': this.width, 'location': new Location(0, 0)};

    // *** Initializations ***
    this._qualitySetup();

    this.controller = new AppController(this.height, this.width, this.workingSpace);
    this.initElements();

    this.render();
  }

  /**
   * [_qualitySetup description]
   */
  _qualitySetup() {
    let devicePixelRatio = window.devicePixelRatio || 1;
    let backingStoreRatio = canvasCtx.webkitBackingStorePixelRatio ||
                            canvasCtx.mozBackingStorePixelRatio ||
                            canvasCtx.msBackingStorePixelRatio ||
                            canvasCtx.oBackingStorePixelRatio ||
                            canvasCtx.backingStorePixelRatio || 1;
    let ratio = devicePixelRatio / backingStoreRatio;
    $canvas.width = this.width * ratio;
    $canvas.height = this.height * ratio;
    $canvas.style.width = this.width + 'px';
    $canvas.style.height = this.height + 'px';
    canvasCtx.scale(ratio, ratio);
  }

  /**
   * create elements that should be added just after loaded app
   */
  initElements() {
    createElement('menu', {parentHeight: this.height, parentWidth: this.width, workingSpace: this.workingSpace});
    createElement('line', this.workingSpace);
  }

  /**
   * [clear description]
   */
  clear() {
    canvasCtx.clearRect(0, 0, this.width, this.height);
  }

  /**
   * draw background & grid
   */
  renderBackground() {
    // draw background
    canvasCtx.fillStyle = this.background;
    canvasCtx.fillRect(0, 0, this.width, this.height);

    // draw grid
    canvasCtx.lineWidth = 1;
    canvasCtx.strokeStyle = '#bbb842';

    canvasCtx.beginPath();
    // horizontal
    for (let i = 0; this.height > i; i+=gridStep) {
      canvasCtx.moveTo(0, i);
      canvasCtx.lineTo(this.width, i);
    }
    // vertical
    for (let i = 0; this.width > i; i+=gridStep) {
      canvasCtx.moveTo(i, 0);
      canvasCtx.lineTo(i, this.height);
    }
    canvasCtx.stroke();
  }

  /**
   * [render description]
   */
  render() {
    requestAnimationFrame(this.render.bind(this));

    // skip render if nothing is changed
    if (redraw.isValidCanvasState) return;

    this.clear();
    this.renderBackground();
    this.controller.render();

    redraw.isValidCanvasState = true;
  }
}

// remove it later
window.app = new App();
