// @flow

import {UICtrl} from '../../core/base/controllers';
import {getMousePos} from '../../core/utils';
import {Menu} from './models';

/**
 * ...
 */
export class MenuCtrl extends UICtrl {
  model: Menu;
  // view: MenuView;

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
