// @flow

import '../css/main.css';

import {$canvas, canvasCtx, DEFAULT_CURSOR} from './constants';
import {AppController} from './core/app_controller';
import {Location} from './core/base/models';
import {createElement} from './components';
import {createMenu} from './menu';

/**
 * ...
 */
export class App {
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
    this.background = '#e4e4e4';
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    // rect without including menu or navigation
    this.workingSpace = {'height': this.height, 'width': this.width, 'location': new Location(0, 0)};

    // *** Initializations ***
    this.qualitySetup();

    this.controller = new AppController(this);
    // create the menu
    this.controller.addCtrl(
      createMenu({
        getParentHeight: () => this.height,
        getParentWidth: () => this.width,
        workingSpace: this.workingSpace,
      })
    );
    this.constructor.initElements();
    $canvas.style.cursor = DEFAULT_CURSOR;
  }

  /**
   * [_qualitySetup description]
   */
  qualitySetup() {
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
  static initElements() {
    createElement('line', {startPoint: new Location(100, 100), endPoint: new Location(100, 200)});
    createElement('lamp', {location: new Location(600, 100)});
    createElement('battery', {location: new Location(605, 195)});
  }
}

// remove it later
window.app = new App();
