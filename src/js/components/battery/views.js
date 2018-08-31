import {UIView} from '../../core/base/views';
import {drawImage} from '../../core/utils';
import {Battery} from './models';
import {IMG} from './models';

/**
 * BatteryView class
 */
export class BatteryView extends UIView {
  /**
   * Paint Battery
   */
  render(battery: Battery) {
    drawImage(IMG, battery.location.x, battery.location.y, battery.width, battery.height);
  }

  /**
   * render icon
   */
  static renderIcon(location: Location, width, height) {
    return drawImage(IMG, location.x, location.y, width, height);
  }
}
