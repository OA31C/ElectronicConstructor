import {Location, UIElement} from '../../core/base/models';
import {createElement} from '../index';
import {LineCtrl} from '../line/controllers';
import {redraw} from '../../core/utils';

export const IMG_ACTIVE = 'lamp/lamp_on.png';
export const IMG_INACTIVE = 'lamp/lamp_off.png';

/**
 * ...
 */
export class Lamp extends UIElement {
  active: boolean;
  height: number;
  isDisplayed: boolean;
  line: LineCtrl;
  location: Location;
  width: number;

  /**
   * ...
   */
  constructor({location}) {
    super();
    this.location = location;
    this.active = false;
    this.height = 60;

    this.width = 60;

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
    return this.active ? IMG_ACTIVE : IMG_INACTIVE;
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
    return 'device that generates visible light from an electric current stream';
  }
}
