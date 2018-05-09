import {AppController} from '../core/app_controller';
import {UICtrl} from '../core/base/controllers';
import {Line} from './line/models';
import {LineView} from './line/views';
import {LineCtrl} from './line/controllers';
import {MenuCtrl} from './menu/controllers';
import {MenuView} from './menu/views';
import {Menu} from './menu/models';


const ELEMENTS = {
  battery: {},
  lamp: {},
  line: {model: Line, view: LineView, ctrl: LineCtrl},
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
  const view = new element.view();
  // eslint-disable-next-line new-cap
  const ctrl = new element.ctrl(model, view);
  AppController.instance.addCtrl(ctrl);
  return ctrl;
}
