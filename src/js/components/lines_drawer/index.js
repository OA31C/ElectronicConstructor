import {LinesDrawerCtrl} from './controllers';
import {LinesDrawer} from './models';
import {LinesDrawerView} from './views';

/**
 *
 */
export function createLinesDrawer(rect: Object={}): LinesDrawerCtrl {
  const model = new LinesDrawer(rect);
  const view = new LinesDrawerView();
  return new LinesDrawerCtrl(model, view);
}
