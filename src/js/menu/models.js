// @flow


import {isElementHover} from '../core/utils.js';
import {Location, UIElement} from '../core/base/models.js';
import {ELEMENTS} from '../components';
import {redraw} from '../core/utils';

/**
 * ...
 */
export class Menu extends UIElement {
  background: string;
  borderColor: string;
  borderWidth: number;
  closeButton: MenuButton;
  defaultWidth: number;
  getParentHeight: Function;
  getParentWidth: Function;
  isDisplayed: boolean;
  isResizeHold: boolean;
  items: Array<MenuItem>;
  partOfCanvas: number;
  priority: number;
  workingSpace: Object;

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

    this.partOfCanvas = 5;
    this.borderWidth = 1;
    this.borderColor = '#000000';
    this.background = '#ffffff';
    this.priority = Infinity;

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
    for (const item of this.items) {
      item.width = this._width;
    }
  }

  /**
   * Getter width
   */
  get width(): number {
    return this._width;
  }

  /**
   * [initItems descript-ion]
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
  backgroundColor: string;
  description: string;
  descriptionFont: string;
  element: string;
  font: string;
  height: number;
  hoverBackgroundColor: string;
  iconMargin: number;
  iconMarginLeft: number;
  iconWidth: number;
  isDisplayed: boolean;
  isHovered: boolean;
  isSelected: boolean;
  marginText: number;
  menu: Menu;
  prevItem: MenuItem;
  textAlign: string;
  textColor: string;
  textFont: string;
  textSize: number;
  topMargin: number;
  width: number;

  /**
   * [constructor description]
   */
  constructor(menu: Menu, prevItem: MenuItem, element: string, description: string, locationElement: Location) {
    super();
    this.element = element;
    this.description = description;
    this.menu = menu;
    this.prevItem = prevItem;

    this.textAlign = 'start';
    this.textColor = '#000000';
    this.textFont = 'Helvetica';
    this.textSize = 16;
    this.font = 'bold';
    this.descriptionFont = 'normal 14px Helvetica';
    this.height = 40;
    this.width = menu.width;

    this.isDisplayed = true;
    this.isSelected = false;
    this.focus = false;

    this.isHovered = false;
    this.backgroundColor = '#ffffff';
    this.hoverBackgroundColor = '#eeeeee';

    this.topMargin = 14;
    this.marginText = 3;

    this.iconWidth = 40;
    this.iconHeight = this.height;
    this.iconMargin = 1.3;
    this.iconMarginLeft = 3;
    this.locationElement = locationElement;
  }

  /**
   * [isHover description]
   */
  isHover(mousePos: Location): boolean {
    return isElementHover(this, mousePos);
  }

  /**
   * @returns {string}
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

  /**
   * Location item
   */
  get location(): Location {
    return new Location(
      this.menu.location.x + this.menu.borderWidth,
      this.prevItem ? this.prevItem.location.y + this.prevItem.height + this.menu.borderWidth : this.menu.borderWidth
    );
  }

  /**
  * ....
  */
  get iconLocation(): Location {
    return new Location(this.location.x + this.iconMarginLeft, this.location.y);
  }
}

/**
 * Start create button
 */
export class MenuButton extends UIElement {
  background: string;
  borderColor: string;
  borderWidth: number;
  height: number;
  img: string;
  isDisplayed: boolean;
  location: Location;
  width: number;

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
