import {UICtrl} from '../../core/base/controllers';
import {Battery} from './models';
import {BatteryView} from './views';


export class BatteryCtrl extends UICtrl {
  model: Battery;
  view: BatteryView;

  /**
   * ...
   */
  // render() {
  //   this.view.render(this.model);
  // }
}
