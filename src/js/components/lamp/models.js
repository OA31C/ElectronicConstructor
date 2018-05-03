import {Location, UIElement} from '../../core/base/models';

/**
 * ...
 */
export class Lamp extends UIElement {
  imgActive: string;
  imgInactive: string;

  /**
   * ...
   */
  constructor() {
    super();

    this.location = new Location(0, 0);
    this.width = 50;
    this.height = 50;

    this.isDisplayed = true;

    this.imgActive = 'lamp/lamp_on.png';
    this.imgInactive = 'lamp/lamp_off.png';
  }
}
