// @flow

import {UICtrl} from '../../core/base/controllers.js';
import {getMousePos} from '../../core/utils.js';
import {Menu} from './models.js';

/**
 * ...
 */
export class MenuCtrl extends UICtrl {
  model: Menu;

  /**
   * [onClick description]
   */
  onClick(event: MouseEvent): boolean {
    const mousePosition = getMousePos(event);
    // FIXME: check is mouse in menu rect.
    for (const item of this.model.items) {
      if (item.isHover(mousePosition)) {
        item.select();
      } else {
        item.deselect();
      }
    }
    return true;
  }
}
