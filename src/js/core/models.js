const data = require('../data.js');

/**
 * This is using for all of coordinate instances
 * @param  {Number} x
 * @param  {Number} y
 */
export class Location {

  constructor(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new TypeError('Location takes two required arguments, type: number.');
    };

    this.x = x;                        // type: Number
    this.y = y;                        // type: Number
  }

}

/**
 * Every custom list of ui elements should inheritance from this class
 */
export class UIElementsList extends Array {

  get displayedChildren() {
    return this.filter(item => item.isDisplayed);
  }
  get displayedChildrenLength() {
    return this.displayedChildren.length;
  }

}

/**
 * Every model that need to show in the canvas - should inheritance from this class
 */
export class UIElement {

  constructor(parent) {
    if (!parent) throw new Error('parent is required');
    this.parent      = null;           // type: UIElement || App
    this.setParent(parent);

    this.location    = null;           // type: Location

    this.width       = null;           // type: Number
    this.height      = null;           // type: Number

    this.background  = null;           // type: String

    this.borderWidth = null;           // type: Number
    this.borderColor = null;           // type: String

    // elements which the element contains on its area
    this.children    = null;           // type: UIElementsList

    this.isDisplayed = null;           // type: Boolean

    // events
    // TODO: haven't finished yet
    this.onClick     = null;           // type: Function
    this.onMouseMove = null;           // type: Function
    this.onMouseDown = null;           // type: Function
    this.onMouseUp   = null;           // type: Function

    // all instances of UIElement are saving in ClassName.instances list
    this._addToList();
  }

  show() {
    this.isDisplayed = true;
    data.isValidCanvasState = false;

  }

  hide() {
    this.isDisplayed = false;
    data.isValidCanvasState = false;
  }

  /**
   * sets parent property to self, and adds this instance as a child to parent.children property.
   * @param {UIElement || App} parent
   */
  setParent(parent) {
    this.parent = parent;
    if (parent.children === null || parent.children === undefined) {
      parent.children = new parent.childrenListClass(this);
      return;
    };
    if (!parent.children.includes(this)) {
      parent.children.push(this);
    };
  }

  addChild(child) {
    if (this.children === null || parent.children === undefined) {
      this.children = new this.childrenListClass(child);
      return;
    };
    if (!this.children.includes(child)) {
      this.children.push(child);
    };
  }

  get childrenListClass() {
    return UIElementsList;
  }

  get instancesListClass() {
    return UIElementsList;
  }

  _addToList() {
    if (this.constructor.instances === undefined) {
      this.constructor.instances = new this.instancesListClass(this);
      return;
    }
    this.constructor.instances.push(this);
  }

}

/**
 * Every model that shows text in the canvas - should inheritance from this class
 */
export class UIText extends UIElement {

  constructor(parent) {
    super(parent);

    this.text      = null;           // type: String
    this.textAlign = null;           // type: String
    this.textColor = null;           // type: String
    this.textFont  = null;           // type: String
    this.textSize  = null;           // type: Number

    this.topMargin = null;           // type: Number
  }

}
