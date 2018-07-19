import {Location, UIElement} from '../../core/base/models';
import {createElement} from '../index';
import {LineCtrl} from '../line/controllers';
import {redraw} from '../../core/utils';

export const ImgActive = 'lamp/lamp_on.png';
export const ImgInActive = 'lamp/lamp_off.png';

/**
 * ...
 */
export class Lamp extends UIElement {
  active: boolean;
  line: LineCtrl;

  /**
   * ...
   */
  constructor({location}) {
    super();
    this.location = location;
    this.active = false;
    this.width = 60;
    this.height = 60;

    this.line = createElement(
      'line', {
        startPoint: new Location(this.location.x, this.location.y + this.height),
        endPoint: new Location(this.location.x + this.width, this.location.y + this.height),
        mutable: false,
      }
    );

    this.isDisplayed = true;
  }

  /**
   * get an image of current lamp state (on/off)
   */
  get img(): string {
    return this.active ? ImgActive : ImgInActive;
  }

  /**
   * turn the lamp on
   */
  on() {
    this.active = true;
    redraw();
  }

  /**
   * turn the lamp off
   */
  off() {
    this.active = false;
    redraw();
  }

  /**
   * description lamp
   */
  static get description() {
    return ' - Device that generates visible light from an electric current stream';
  }
}
