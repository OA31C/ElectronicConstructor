import {Location, UIElement} from '../../core/base/models';
import {createElement} from '../index';
import {LineCtrl} from '../line/controllers';
import {redraw} from '../../core/utils';


/**
 * ...
 */
export class Lamp extends UIElement {
  active: boolean;
  imgActive: string;
  imgInactive: string;
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

    this.imgActive = 'lamp/lamp_on.png';
    // this.imgInactive = 'lamp/lamp_off.png';
  }

  /**
   * get an image of current lamp state (on/off)
   */
  get img(): string {
    return this.active ? this.imgActive : this.imgInactive;
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

  static imgInactive() {
    return 'lamp/lamp_off.png';
  }
}
