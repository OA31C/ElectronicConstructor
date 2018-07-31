// @flow

// FIXME: use flow interfaces!!!

import {redraw} from '../utils';

/**
 * Use it for all of coordinate instances
 */
export class Location {
  x: number;
  y: number;

  /**
   * [constructor description]
   * @param  {[type]} x: number        [description]
   * @param  {[type]} y: number        [description]
   */
  constructor(x: number, y: number) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new TypeError('Location takes two required arguments, type: number.');
    }
    this.x = x;
    this.y = y;
  }
}

/**
 * Every model that one is needed to be shown in the canvas - should be inherited from this class
 */
export class UIElement {
  location: Location;

  width: number;
  height: number;

  background: string;

  borderWidth: number;
  borderColor: string;

  isDisplayed: boolean;


  /**
   * [show description]
   */
  show() {
    this.isDisplayed = true;
    redraw();
  }

  /**
   * [hide description]
   */
  hide() {
    this.isDisplayed = false;
    redraw();
  }
}

/**
 * ...
 */
export class Electron {}
