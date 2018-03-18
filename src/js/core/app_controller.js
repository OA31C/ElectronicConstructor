// @flow

import {UICtrl} from './base/controllers.js';
import {$canvas} from '../constants.js';
import {MenuCtrl} from '../components/menu/controllers.js';
import {Menu} from '../components/menu/models.js';
import {MenuView} from '../components/menu/views.js';

/**
 * The main controller that contains all other controllers
 */
export class AppController {
  controllers: Array<UICtrl>;
  availableEvents: Array<string>;

  /**
   * [constructor description]
   * @param  {[type]} appHeight: number        [description]
   * @param  {[type]} appWidth:  number        [description]
   */
  constructor(appHeight: number, appWidth: number) {
    // *** PROPERTIES ***
    this.controllers = [
      new MenuCtrl(new Menu(appHeight, appWidth), new MenuView()),
    ];
    this.availableEvents = ['onClick', 'onMouseMove', 'onMouseDown', 'onMouseUp'];

    // *** Initializaions ***

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
      };

      $canvas.addEventListener(jsEventName, (event) => {
        for (const controller of this.controllers) {
          const controllerHandler = controller[availableEvent];
          if (!controllerHandler || typeof controllerHandler !== 'function') continue;

          const propagate = controllerHandler(event);
          if (!propagate) break;
        };
      });
    };
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
