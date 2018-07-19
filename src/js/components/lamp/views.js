import {UIView} from '../../core/base/views';
import {Lamp} from './models';
import {drawImage} from '../../core/utils';
import {ImgInActive} from './models';

/**
 * ...
 */
export class LampView extends UIView {
  /**
   * ...
   */
  render(lamp: Lamp) {
    drawImage(ImgInActive, lamp.location.x, lamp.location.y, lamp.width, lamp.height);
  }

  /**
   * render icon Lamp
   */
  static renderIcon(location: Location, width, height) {
    return drawImage(ImgInActive, location.x, location.y, width, height);
  }
}
