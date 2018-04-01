// @flow


import {Location, UIElement} from '../../core/base/models';
import {$canvas} from '../../constants';
import {isElementHover} from '../../core/utils';


/**
 * ...
 */
export class LinesDrawer extends UIElement {
  isHold: boolean;
  isSelected: boolean;
  lines: LinesList<Line>;
  rect: Object;

  /**
   * ...
   * @param rect {Object}  Rect where's drawable area
   */
  constructor(rect: Object={}) {
    super();
    this.rect = rect;
    this.location = rect.location || new Location(0, 0);
    this.isDisplayed = true;

    // true: when user has clicked on canvas and he hasn't set loose it yet
    // AND user's mouse isn't out of the rect
    this.isHold = false;

    // true: when user has clicked by any of drawn line
    this.isSelected = false;

    // all drawn lines are keeping here
    this.lines = new LinesList();
  }

  /**
   * Returns a dynamic height
   * @returns {number}
   */
  get height(): number {
    return this.rect.height || $canvas.height;
  }

  /**
   * Returns a dynamic width
   * @returns {number}
   */
  get width(): number {
    return this.rect.width || $canvas.width;
  }

  /**
   * ...
   */
  hold() {
    this.isHold = true;
  }

  /**
   * ...
   */
  unhold() {
    this.isHold = false;
  }

  /**
   * ...
   */
  isInRect(mousePos: Location): boolean {
    return isElementHover(this, mousePos);
  }
}


/**
 * ...
 */
export class Line extends UIElement {
  coordinates: Array<Location>;

  /**
   * ...
   */
  constructor(mousePos: Location) {
    super();
    this.coordinates = [mousePos];
  }

  /**
   * ...
   */
  update(mousePos: Location) {
    // 1) skip this coordinate when it's the same as well as the latest saved one
    if (this.coordinates.length) {
      let lastCoordinate = this.coordinates[this.coordinates.length - 1];
      if (lastCoordinate.x === mousePos.x && lastCoordinate.y === mousePos.y) return;
    }

    // 2) add a new coordinate every time
    this.coordinates.push(mousePos);

    // 3) check last three coordinates
    // -------------------------------
    if (this.coordinates.length < 3) {
      return;
    }

    let lastThreeCoordinates = this.coordinates.slice(-3);

    // * if it's a straight line, like: ---, or: |
    //                                           |
    // - remove the second coordinate
    if ((lastThreeCoordinates[0].x === lastThreeCoordinates[1].x &&
         lastThreeCoordinates[0].x === lastThreeCoordinates[2].x) ||
        (lastThreeCoordinates[0].y === lastThreeCoordinates[1].y &&
         lastThreeCoordinates[0].y === lastThreeCoordinates[2].y)) {
      this.coordinates.splice(-2, 1);
    }

    // TODO: optimization
    // add checks lines like this /
    //                           /
    // -------------------------------
  }
}

/**
 * ...
 */
class LinesList extends Array {
  /**
   * Creates a new line from a location, and puts it to an array
   * @param mousePos
   */
  add(mousePos: Location) {
    this.push(new Line(mousePos));
  }

  /**
   * Adds a new coordinate to the latest line in an array
   * @param mousePos
   */
  update(mousePos: Location) {
    if (!this.length) return; // skip when list is empty
    this[this.length - 1].update(mousePos);
  }
}
