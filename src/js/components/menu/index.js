import {MenuCtrl} from './controllers';
import {MenuView} from './views';
import {Menu} from './models';

/**
 *
 */
export function createMenu(parentHeight: number, parentWidth: number): MenuCtrl {
  const menu = new Menu(parentHeight, parentWidth);
  const view = new MenuView();
  return new MenuCtrl(menu, view);
}
