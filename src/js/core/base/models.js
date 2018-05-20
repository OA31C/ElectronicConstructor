// @flow

// FIXME: use flow interfaces!!!

/**
 * Use it for all of coordinate instances
 */
export class Location {
  x: number;
  y: number;

  /**
   * [constructor description]
   * @param  {[type]} x: number        [description]
   * @param  {[type]} y: number        [description]
   */
  constructor(x: number, y: number) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new TypeError('Location takes two required arguments, type: number.');
    }
    this.x = x;
    this.y = y;
  }
}

/**
 * Every custom list of ui elements should inheritance from this class
 */
export class UIElementsList extends Array {
  /**
   * [displayedChildren description]
   */
  get displayedChildren() {
    return this.filter((item) => item.isDisplayed);
  }

  /**
   * [displayedChildrenLength description]
   */
  get displayedChildrenLength() {
    return this.displayedChildren.length;
  }
}

/**
 * Every model that one is needed to be shown in the canvas - should be inherited from this class
 */
export class UIElement {
  location: Location;

  width: number;
  height: number;

  background: string;

  borderWidth: number;
  borderColor: string;

  isDisplayed: boolean;

  /**
   * [show description]
   */
  show() {
    this.isDisplayed = true;
  }

  /**
   * [hide description]
   */
  hide() {
    this.isDisplayed = false;
  }
}

/**
 * Every model that shows text in the canvas - should inheritance from this class
 */
export class UIText extends UIElement {
  text: string;
  textAlign: string;
  textColor: string;
  textFont: string;
  textSize: number;
  topMargin: number;

  /**
   * [constructor description]
   */
  constructor(text: string) {
    super();
    this.text = text;
  }
}

/**
 * ...
 */
export class Electron {}
