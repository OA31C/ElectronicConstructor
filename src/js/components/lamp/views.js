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
    drawImage(lamp.img, lamp.location.x, lamp.location.y, lamp.width, lamp.height);
  }
}
