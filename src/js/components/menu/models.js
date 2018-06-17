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
    this.defaultWidth = this.width;

    const closeButtonWidth = 20;
    this.closeButton = new MenuButton({
        location: new Location(this.location.x + this.width - closeButtonWidth, 0),
        width: closeButtonWidth, height: 18,
        background: '#EE3742',
    });
    this.closeButton.onClick = () => this.show();
    this.initItems();
  }

  /**
   * returns the location
   */
  get location(): Location {
    return new Location(this.getParentWidth() - this.width, 0);
  }

  /**
   * returns height menu
   */
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

  /**
   * Getter width
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

  /**
   * Check if mouse position x is close to menu border
   */
  isBorderHover(mouseX: number, elementX: number) {
      return Math.abs(mouseX - elementX) < this.borderWidth;
  }

  /**
   * show the menu + hide closeButton
   */
  show() {
    if (!this.isResizeHold) {
        this.width = this.defaultWidth;
    }
    super.show();
    this.closeButton.hide();
  }

  /**
   * hide the menu + show closeButton
   */
  hide() {
    super.hide();
    this.closeButton.show();
  }
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
  isHover(mousePos: Location): boolean {
    return isElementHover(this, mousePos);
  }
}

/**
 * Start create button
 */
export class MenuButton extends UIElement {
  img: string;

  /**
   * [constructor description]
   */
  constructor({location, width, height, background}) {
      super();
      this.location = location;

      this.width = width;
      this.height = height;

      this.background = background;
      this.borderColor = '#050505';
      this.borderWidth = 1;

      this.img = 'buttons/menu_button.png';

      this.isDisplayed = false;
      MenuButton.instances.push(this);
  }
}
MenuButton.instances = [];
