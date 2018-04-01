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
   * [constructor description]
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
