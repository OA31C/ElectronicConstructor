import {AppController} from '../core/app_controller';
import {UICtrl} from '../core/base/controllers';
import {Line} from './line/models';
import {LineView} from './line/views';
import {LineCtrl} from './line/controllers';
import {Lamp} from './lamp/models';
import {LampCtrl} from './lamp/controllers';
import {LampView} from './lamp/views';
import {Battery} from './battery/models';
import {BatteryView} from './battery/views';
import {BatteryCtrl} from './battery/controllers';


export const ELEMENTS = {
  battery: {model: Battery, view: BatteryView, ctrl: BatteryCtrl},
  lamp: {model: Lamp, view: LampView, ctrl: LampCtrl},
  line: {model: Line, view: LineView, ctrl: LineCtrl},
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


/**
 * Array to keep all elements
 */
export class ElementsList extends Array {

  /**
   * get a specific element
   * @param elementName
   * @param params
   * @returns {UICtrl} and raises and error when there's no elements with such params, or when more than one element
   */
  get(elementName, params={}): UICtrl {
    const elements = this.filter((item) => item.isDisplayed);
  }

  filter() {
    return ;
  }

  delete() {

  }
}
