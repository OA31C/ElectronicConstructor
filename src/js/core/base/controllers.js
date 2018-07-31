// @flow

import {UIElement} from './models.js';
import {UIView} from './views.js';
import {redraw} from '../utils';

/**
 * ...
 */
export class UICtrl {
  model: UIElement;
  view: UIView;

  /**
   * set model & view, and send an event to draw the element
   */
  constructor(model: UIElement, view: UIView) {
    this.model = model;
    this.view = view;
    redraw();
  }

  /**
   * render the element
   */
  render() {
    this.view.render(this.model);
  }
}
