// @flow

import {isElementHover} from '../core/utils.js';
import {Location, UIElement} from '../core/base/models.js';
import {ELEMENTS} from '../components';
import {redraw} from '../core/utils';

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

    this.items = [];
    this.partOfCanvas = 5;
    this.borderWidth = 1;
    this.borderColor = '#000000';

    this.background = '#ffffff';

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
    if (this.items.length) throw new Error('Menu items already have been specified!');
    for (const [elementName, element] of Object.entries(ELEMENTS)) {
      const prevItem = this.items.length ? this.items[this.items.length-1] : null;
      this.items.push(new MenuItem(this, prevItem, elementName, element.model.description));
    }
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
export class MenuItem extends UIElement {
  description: string;
  element: string;
  isSelected: boolean;
  location: Location;

  /**
   * [constructor description]
   */
  constructor(menu: Menu, prevItem: MenuItem, element: string, description: string) {
    super();
    this.element = element;
    this.description = description;

    this.iconWidth = 50;
    this.location = new Location(
      menu.location.x + menu.borderWidth,
      prevItem ? prevItem.location.y + prevItem.height + menu.borderWidth : menu.borderWidth
    );

    this.textAlign = 'start';
    this.textColor = '#000000';
    this.textFont = 'Helvetica';
    this.textSize = 16;
    this.font = 'bold';
    this.height = 40;
    this.width = menu.width;

    this.isDisplayed = true;
    this.isSelected = false;

    this.isHovered = false;
    this.backgroundColor = '#ffffff';
    this.hoverBackgroundColor = '#eeeeee';
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

  /**
   * @returns {string}
   * change color background
   */
  get background() {
    return this.isHovered ? this.hoverBackgroundColor : this.backgroundColor;
  }

  /**
   * ....
   */
  hover() {
    this.isHovered = true;
    redraw();
  }

  /**
   * ...
   */
  unhover() {
    this.isHovered = false;
    redraw();
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
