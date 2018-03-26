import {MenuCtrl} from './controllers';
import {MenuView} from './views';
import {Menu} from './models';

/**
 *
 */
export function createMenu(parentHeight: number, parentWidth: number, workingSpace: Object): MenuCtrl {
  const menu = new Menu(parentHeight, parentWidth, workingSpace);
  const view = new MenuView();
  window.menu = new MenuCtrl(menu, view);
  return window.menu;
}
