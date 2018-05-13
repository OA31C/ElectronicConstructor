// @flow


import {Location, UIElement} from '../../core/base/models';
import {isCircleHover, isEqual} from '../../core/utils';
import {gridStep} from '../../constants';


/**
 * ...
 */
export class Line extends UIElement {
  coordinates: Array<Location>;
  lineWidth: number;
  hold: string | boolean;

  /**
   * ...
   */
  constructor({startPoint, endPoint}) {
    if (!startPoint || !endPoint) throw new Error('arguments are required!');
    super();
    this.coordinates = [startPoint, endPoint];
    this.lineWidth = 3;

    this.isDisplayed = true;

    // 'output' or 'input': when user has clicked on output/input and he hasn't set loose it yet
    this.hold = false;
  }

  /**
   * checks is mouse on input
   */
  isInputHover(mousePos: Location): boolean {
    return isCircleHover(this.input, mousePos);
  }

  /**
   * checks is mouse on output
   */
  isOutputHover(mousePos: Location): boolean {
    return isCircleHover(this.output, mousePos);
  }

  /**
   * check is mouse on input/output
   */
  setHold(mousePos: Location) {
    if (this.isInputHover(mousePos)) {
      this.hold = 'input';
    } else if (this.isOutputHover(mousePos)) {
      this.hold = 'output';
    } else {
      this.hold = false;
    }
  }

  /**
   * returns the first coordinate and radius
   */
  get input(): Object {
    return {
      location: this.coordinates[0],
      radius: this.lineWidth+1,
    };
  }

  /**
   * returns the latest coordinate and radius
   */
  get output(): Object {
    return {
      location: this.coordinates[this.coordinates.length-1],
      radius: this.lineWidth+1,
    };
  }

  /**
   * ...
   */
  update(mousePos: Location) {
    // 1) skip if no holding
    if (!this.hold) return false;
    // 2) Line instance always has to have some coordinates before update
    if (!this.coordinates.length) throw new Error('Line has to have initial coordinates!');

    let lastCoordinate = this.coordinates[this.coordinates.length - 1];

    // 3) skip this coordinate when it's the same as well as the latest saved one
    if (isEqual(lastCoordinate, mousePos)) return false;

    mousePos.x = Math.round(mousePos.x / gridStep) * gridStep;
    mousePos.y = Math.round(mousePos.y / gridStep) * gridStep;

    // 4) push the coordinate
    if (this.hold === 'input') {
      this.coordinates.unshift(mousePos);
    } else if (this.hold === 'output') {
      this.coordinates.push(mousePos);
    } else console.warn(`Unknown hold: ${this.hold}`);

    // 5) check last three coordinates (FIXME: should check first three coordinates too, if it's input)
    // -------------------------------
    if (this.coordinates.length > 3) {
      const lastThreeCoordinates = this.coordinates.slice(-3);
      // * if it's a horizontal or vertical line:
      //   - remove the second coordinate
      if ((lastThreeCoordinates[0].x === lastThreeCoordinates[1].x &&
           lastThreeCoordinates[0].x === lastThreeCoordinates[2].x) ||
          (lastThreeCoordinates[0].y === lastThreeCoordinates[1].y &&
           lastThreeCoordinates[0].y === lastThreeCoordinates[2].y)) {
        this.coordinates.splice(-2, 1);
      }
    }
    return true;
  }
}
