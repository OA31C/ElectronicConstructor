
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
export class UIElementsList extends Array {}

/**
 * Every model that need to show in the canvas - should inheritance from this class
 */
export class UIElement {

  constructor() {
    this.location    = null;           // type: Location

    this.width       = null;           // type: Number
    this.height      = null;           // type: Number

    this.background  = null;           // type: String

    this.borderWidth = null;           // type: Number
    this.borderColor = null;           // type: String

    // elements which the element contains on its area
    this.items       = null;           // type: UIElementsList

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
  }

  hide() {
    this.isDisplayed = false;
  }

  addItem(item) {
    if (this.items === null) {
      this.items = new this.itemsListClass(item);
      return;
    }
    this.items.push(item);
  }

  get itemsListClass() {
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

  constructor() {
    super();

    this.text      = null;           // type: String
    this.textColor = null;           // type: String
    this.textFont  = null;           // type: String
    this.textSize  = null;           // type: Number

    this.topMargin = null;           // type: Number
  }

}
