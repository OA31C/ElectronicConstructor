// @flow

import {UIElement} from './models.js';
import {UIView} from './views.js';

/**
 * ...
 */
export class UICtrl {
  model: UIElement;
  view: UIView;

  /**
   * [constructor de scription]
   * @param  {UIElement} model [description]
   * @param  {UIView} view  [description]
   */
  constructor(model: UIElement, view: UIView) {
    this.model = model;
    this.view = view;
  }

  /**
   * [render description]
   */
  render() {
    this.view.render(this.model);
  }
}