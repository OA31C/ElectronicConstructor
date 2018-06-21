import {UIView} from '../../core/base/views';
import {Lamp} from './models';
import {drawImage} from '../../core/utils';

/**
 * ...
 */
export class LampView extends UIView {
  /**
   * ...
   */
  render(lamp: Lamp) {
    drawImage(Lamp.imgInactive(), lamp.location.x, lamp.location.y, lamp.width, lamp.height);
  }

  static renderIcon(location: Location, width, height) {
    drawImage(Lamp.imgInactive(), location.x - 50, location.y, width, height + 10);
  }
}

