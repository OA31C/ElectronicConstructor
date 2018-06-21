import {MenuCtrl} from './controllers';
import {MenuView} from './views';
import {Menu} from './models';

/**
 * creates the menu
 * @param options menu options
 * @returns {MenuCtrl}
 */
export function createMenu(options): MenuCtrl {
  return new MenuCtrl(new Menu(options), new MenuView());
}
