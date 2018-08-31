// @flow


import {Location, UIElement} from '../../core/base/models';
import {isCircleHover, isEqual} from '../../core/utils';
import {GRID_STEP} from '../../constants';
import {createElement} from '../index';
import {LineCtrl} from './controllers';

export const DEFAULT_LINE_WIDTH = 3;
/**
 * ...
 */
export class Line extends UIElement {
  coordinates: Array<Location>;
  hold: string | boolean;
  immutableLineColor: string;
  isDisplayed: boolean;
  lineColor: string;
  lineWidth: number;
  mutable: boolean;
  pointWidth: number;

  /**
   * ...
   */
  constructor({startPoint, endPoint, mutable=true}) {
    if (!startPoint || !endPoint) throw new Error('arguments are required!');
    super();
    this.coordinates = [startPoint, endPoint];
    this.lineColor = '#3e3e3e';
    this.lineWidth = DEFAULT_LINE_WIDTH;
    this.pointWidth = this.lineWidth + 1;

    // `true`: updates the current instance; `false`: creates a new instance
    this.mutable = mutable;
    this.immutableLineColor = '#ff2e34';

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
  setHold(mousePos: Location): boolean {
    if (this.isInputHover(mousePos)) {
      this.hold = 'input';
    } else if (this.isOutputHover(mousePos)) {
      this.hold = 'output';
    } else {
      this.hold = false;
    }
    return !!this.hold;
  }

  /**
   * @returns: lineColor if mutable, immutableLineColor otherwise
   */
  get color() {
    return this.mutable ? this.lineColor : this.immutableLineColor;
  }

  /**
   * returns the first coordinate and radius
   */
  get input(): Object {
    return {
      location: this.coordinates[0],
      radius: this.pointWidth,
    };
  }

  /**
   * returns the latest coordinate and radius
   */
  get output(): Object {
    return {
      location: this.coordinates[this.coordinates.length-1],
      radius: this.pointWidth,
    };
  }

  /**
   * ...
   */
  update(mousePos: Location): boolean {
    // 1) skip if no holding
    if (!this.hold) return false;
    // or wrong hold
    if (!this[this.hold]) throw new Error(`Incorrect 'this.hold': ${this.hold}`);
    // 2) Line instance always has to have some coordinates before update
    if (!this.coordinates.length) throw new Error('Line has to have initial coordinates!');

    // 3) move location to the nearest grid point
    mousePos.x = Math.round(mousePos.x / GRID_STEP) * GRID_STEP;
    mousePos.y = Math.round(mousePos.y / GRID_STEP) * GRID_STEP;

    const theLatestLocation = this[this.hold].location;

    // 4) skip this coordinate when it's the same as well as the latest saved one
    if (isEqual(theLatestLocation, mousePos)) return false;

    // 5) immutable? -> create another Line instance
    if (!this.mutable) {
      let newLineOptions;
      if (this.hold === 'input') {
        newLineOptions = {startPoint: mousePos, endPoint: theLatestLocation};
      } else {
        newLineOptions = {startPoint: theLatestLocation, endPoint: mousePos};
      }
      const newLineCtrl: LineCtrl = createElement('line', newLineOptions);
      // move mouse hold from the current line to the new one
      newLineCtrl.model.hold = this.hold;
      this.hold = false;
      return true;
    }
    // 6) push the coordinate
    if (this.hold === 'input') {
      this.coordinates.unshift(mousePos);
    } else if (this.hold === 'output') {
      this.coordinates.push(mousePos);
    } else throw new Error(`Unknown 'this.hold': ${this.hold}`);

    // 7) check last three coordinates
    // -------------------------------
    if (this.coordinates.length >= 3) {
      let lastThreeCoordinates;
      if (this.hold === 'output') {
        lastThreeCoordinates = this.coordinates.slice(-3);
      } else {
        lastThreeCoordinates = this.coordinates.slice(0, 3);
      }
      // * if it's a horizontal or vertical line:
      //   - remove the second coordinate
      if ((lastThreeCoordinates[0].x === lastThreeCoordinates[1].x &&
          lastThreeCoordinates[0].x === lastThreeCoordinates[2].x) ||
         (lastThreeCoordinates[0].y === lastThreeCoordinates[1].y &&
          lastThreeCoordinates[0].y === lastThreeCoordinates[2].y)) {
        this.coordinates.splice(this.hold === 'output' ? -2 : 1, 1);
      }
    }
    return true;
  }

  /**
   * description line
   */
  static get description() {
    return 'material that produces light or electricity (as opposed to a dielectric). '+
           'For a conductor characterized by high heat or electrical conductivity.';
  }
}
