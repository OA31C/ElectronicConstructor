import {UIView} from '../../core/base/views';
import {drawImage} from '../../core/utils';
import {Battery} from './models';
import {IMG} from './models';

export class BatteryView extends UIView {
  render(battery: Battery) {
    drawImage(battery.img, battery.location.x, battery.location.y, battery.width, battery.height);
  }

  static renderIcon(location: Location, width, height) {
    return drawImage(IMG, location.x - 40, location.y, width - 20, height + 10);
  }
}
