import {AppController} from '../core/app_controller';
import {UICtrl} from '../core/base/controllers';
import {LinesDrawer} from './lines_drawer/models';
import {LinesDrawerView} from './lines_drawer/views';
import {LinesDrawerCtrl} from './lines_drawer/controllers';
import {MenuCtrl} from './menu/controllers';
import {MenuView} from './menu/views';
import {Menu} from './menu/models';


const ELEMENTS = {
  battery: {},
  lamp: {},
  line: {model: LinesDrawer, view: LinesDrawerView, ctrl: LinesDrawerCtrl},
  menu: {model: Menu, view: MenuView, ctrl: MenuCtrl},
};

/**
 * create model+view+controller of element
 * @returns controller of element
 */
export function createElement(name: string, modelOptions: Object): UICtrl {
  const element = ELEMENTS[name];
  if (!element) throw Error('No such element!');

  // eslint-disable-next-line new-cap
  const model = new element.model(modelOptions);
  // eslint-disable-next-line new-cap
  const view = new element.view(model);
  // eslint-disable-next-line new-cap
  const ctrl = new element.ctrl(model, view);
  AppController.instance.addCtrl(ctrl);
  return ctrl;
}
