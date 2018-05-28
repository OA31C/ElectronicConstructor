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
  getParentHeight: Function;
  getParentWidth: Function;

  /**
   * [constructor description]
   */
  constructor({getParentHeight, getParentWidth, workingSpace}) {
    super();
    this.getParentHeight = getParentHeight;
    this.getParentWidth = getParentWidth;
    this.workingSpace = workingSpace;

    // size, that one will be cut for the menu
    // example: (c = canvas, m = menu, part = 4)
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    this.partOfCanvas = 5;
    this.borderWidth = 1;
    this.borderColor = '#000000';

    this.background = '#cccccc';

    this.isDisplayed = true;

    this.initItems();
  }

  get location(): Location {
    return new Location(this.getParentWidth() - this.width, 0);
  }

  get height(): number {
    return this.getParentHeight();
  }

  get width(): number {
    const width = this.getParentWidth() / this.partOfCanvas;
    this.workingSpace.width -= width - (this.__filledWorkingSpace || 0);
    this.__filledWorkingSpace = width;
    return width;
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

    this.title = '';
    this.description = '';

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
