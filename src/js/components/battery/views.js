import {UIView} from '../../core/base/views';
import {drawImage} from '../../core/utils';
import {Battery} from './models';
import {IMG} from './models';

export class BatteryView extends UIView {
  render(battery: Battery) {
    drawImage(IMG, battery.location.x, battery.location.y, battery.width, battery.height);
  }

  static renderIcon(location: Location, width, height) {
    // const marginX = location.x - 40;
    // const widthIcon = width - 20;
    // const heightIcon = height + 10;
    // return drawImage(IMG, marginX, location.y, widthIcon, heightIcon);
    //   let px = location.x - 100 + width/2;
    let px = location.x + width/2;
    let py = location.y + height/2;

    return drawImage(IMG, location.x + 10, location.y + 5, 35, 35);
  }
}
