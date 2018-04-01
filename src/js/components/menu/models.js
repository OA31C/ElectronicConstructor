// @flow

import {isElementHover} from '../../core/utils.js';
import {Location, UIElement, UIText} from '../../core/base/models.js';

/**
 * ...
 */
export class Menu extends UIElement {
  partOfCanvas: number;
  items: Array<MenuItem>;
  workingSpace: Object;

  /**
   * [constructor description]
   */
  constructor(parentHeight: number, parentWidth: number, workingSpace: Object) {
    super();
    this.workingSpace = workingSpace;

    // size, that one will be cut for the menu
    // example: (c = canvas, m = menu, part = 4)
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    this.partOfCanvas = 5;

    this.height = parentHeight;
    this.width = parentWidth / this.partOfCanvas;
    this.location = new Location(parentWidth - this.width, 0);

    this.borderWidth = 1;
    this.borderColor = '#000000';

    this.background = '#cccccc';

    this.isDisplayed = true;

    this.initItems();
  }

  /**
   * ...
   * @param value
   */
  set width(value: number) {
    this.workingSpace.width -= value - (this.__filledWorkingSpace || 0);
    this.__filledWorkingSpace = value;
    this._width = value;
  }

  /**
   * ...
   * @returns {number}
   */
  get width(): number {
    return this._width;
  }

  /**
   * [initItems description]
   */
  initItems() {
    this.items = [
      new MenuItem('-------------'),
      new MenuItem('Copper'),
      new MenuItem('another item'),
    ];
  };
}

/**
 * ...
 */
export class MenuItem extends UIText {
  isSelected: boolean;

  /**
   * [constructor description]
   */
  constructor(text: string) {
    super(text);

    this.textAlign = 'center';
    this.textColor = '#000000';
    this.textFont = 'Tahoma';
    this.textSize = 18;

    this.topMargin = 10;

    this.isDisplayed = true;
    this.isSelected = false;
  }

  /**
   * [select description]
   */
  select() {
    this.isSelected = true;
  }

  /**
   * [deselect description]
   */
  deselect() {
    this.isSelected = false;
  }

  /**
   * [isHover description]
   */
  isHover(mousePos: Object): boolean {
    return isElementHover(this, mousePos);
  }
}
