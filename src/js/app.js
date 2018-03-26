// @flow

import '../css/main.css';

import {$canvas, canvasCtx} from './constants';
import {AppController} from './core/app_controller';
import {Location} from './core/base/models';

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
   * [clear description]
   */
  clear() {
    canvasCtx.clearRect(0, 0, this.width, this.height);
  }

  /**
   * [render description]
   */
  render() {
    requestAnimationFrame(this.render.bind(this));

    this.clear();

    // render background
    canvasCtx.fillStyle = this.background;
    canvasCtx.fillRect(0, 0, this.width, this.height);

    this.controller.render();
  }
}

// remove it later
window.app = new App();
