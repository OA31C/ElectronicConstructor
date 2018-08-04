import {Location, UIElement} from '../../core/base/models';
import {createElement} from '../index';
import {LineCtrl} from '../line/controllers';

export const IMG = 'battery/battery.png';

/**
 * Battery class
 */
export class Battery extends UIElement {
  line: LineCtrl;

  /**
  * description
  */
  constructor({location}) {
    super();
    this.location = location;
    this.width = 50;
    this.height = 50;

    this.line = createElement(
      'line', {
        startPoint: new Location(this.location.x-5, this.location.y + (this.height / 2)),
        endPoint: new Location(this.location.x+5 + this.width, this.location.y + (this.height / 2)),
        mutable: false,
      }
    );
  }

  /**
   * description battery
   */
  static get description() {
      return 'element of an electric circuit, which ' +
        'ensures that a certain electric current flows in it.';
  }
}
