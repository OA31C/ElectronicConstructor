import {UIView} from '../../core/base/views';
import {drawImage} from '../../core/utils';
import {Battery} from './models';


export class BatteryView extends UIView {
  render(battery: Battery) {
    drawImage(battery.img, battery.location.x, battery.location.y, battery.width, battery.height);
  }
}
