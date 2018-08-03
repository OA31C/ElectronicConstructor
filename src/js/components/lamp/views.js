import {UIView} from '../../core/base/views';
import {Lamp, IMG_INACTIVE} from './models';
import {drawImage} from '../../core/utils';

/**
 * ...
 */
export class LampView extends UIView {
  /**
   * ...
   */
  render(lamp: Lamp) {
    drawImage(IMG_INACTIVE, lamp.location.x, lamp.location.y, lamp.width, lamp.height);
  }

  /**
   * render icon Lamp
   */
  static renderIcon(location: Location, width, height) {
    return drawImage(IMG_INACTIVE, location.x, location.y, width, height);
  }
}
