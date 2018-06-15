/* eslint-disable max-len */
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

    this.isResizeHold = false;

    this.partOfCanvas = 5;
    this.borderWidth = 1;
    this.borderColor = '#000000';

    this.background = '#cccccc';

    this.isDisplayed = true;
    this.width = this.getParentWidth() / this.partOfCanvas;

    this.closeButton = new MenuButton({location: new Location(this.location.x+this.width-19, 0), width: 18, height: 18, background: '#EE3742', text: '◄'});
    this.closeButton.onClick = (event) => {
this.show();
};
    this.initItems();
    console.log(this.isDisplayed);
  }

  /**
   * returns the location
   */
  get location(): Location {
    return new Location(this.getParentWidth() - this.width, 0);
  }

  get height(): number {
    return this.getParentHeight();
  }

  /**
   * return width
   */
  set width(value: number) {
    this.workingSpace.width -= value - (this.__filledWorkingSpace || 0);
    this.__filledWorkingSpace = value;
    this._width = value;
  }

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

/**
 * Start create button
 */
export class MenuButton extends UIElement {
  /**
    * [constructor description]
  * */
  constructor({location, width, height, background, text}) {
      super();
      this.location = location;

      this.width = width;
      this.height = height;

      this.background = background;
      this.borderColor = '#050505';
      this.borderWidth = 1;

      this.imgButton = 'buttons/menu_button.png';

      this.isDisplayed = true;

      MenuButton.instances.push(this);
  }
}

MenuButton.instances = [];
console.log(MenuButton.partOfCanvas);
