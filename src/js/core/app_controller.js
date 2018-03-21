// @flow

import {UICtrl} from './base/controllers.js';
import {$canvas} from '../constants.js';
import {createMenu} from '../components/menu';
import {createLinesDrawer} from '../components/lines_drawer';

/**
 * The main controller that contains all other controllers
 */
export class AppController {
  controllers: Array<UICtrl>;
  availableEvents: Array<string>;

  /**
   * [constructor description]
   */
  constructor(appHeight: number, appWidth: number) {
    // *** PROPERTIES ***
    this.controllers = [
      createMenu(appHeight, appWidth),
      createLinesDrawer(),
    ];
    this.availableEvents = ['onClick', 'onMouseMove', 'onMouseDown', 'onMouseUp'];

    // *** Initializations ***
    this.handleEvents();
  }

  /**
   * USAGE:
   * - add a handle method to a controller, name it like: `onMouseMove`
   * - the method receives one argument `event`
   * - the method should return Boolean value,
   *   that one specifies whether need to handle the event by another one controller
   */
  handleEvents() {
    for (const availableEvent of this.availableEvents) {
      let jsEventName = availableEvent.toLowerCase();
      // remove `on` from event name, like: onclick => click
      if (jsEventName.slice(0, 2) === 'on') {
        jsEventName = jsEventName.slice(2);
      }

      $canvas.addEventListener(jsEventName, (event) => {
        for (const controller of this.controllers) {
          const controllerHandler = controller[availableEvent];
          if (!controllerHandler || typeof controllerHandler !== 'function') continue;

          const propagate = controllerHandler.bind(controller)(event);
          if (!propagate) break;
        }
      });
    }
  }

  /**
   * [render description]
   */
  render() {
    for (const controller of this.controllers) {
      controller.render();
    }
  }
}
