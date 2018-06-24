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
    drawImage(lamp.img, lamp.location.x, lamp.location.y, lamp.width, lamp.height);
  }

  static renderIcon(location: Location, width, height) {
    drawImage(ImgInActive, location.x - 50, location.y, width, height + 10);
  }
}
