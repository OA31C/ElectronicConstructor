// @flow

const data = require('../../data.js');
import {isElementHover} from '../../core/utils.js';
import {Location, UIElement, UIText} from '../../core/base/models.js';

/**
 * ...
 */
export class Menu extends UIElement {
  partOfCanvas: number;
  items: Array<MenuItem>;

  /**
   * [constructor description]
   * @param  {[type]} parentHeight: number        [description]
   * @param  {[type]} parentWidth:  number        [description]
   */
  constructor(parentHeight: number, parentWidth: number) {
    super();

    // size, that one will be cut for the menu
    // example: (c = canvas, m = menu, part = 4)
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    this.partOfCanvas = 5;

    this.height = parentHeight;
    this.width = parentWidth / this.partOfCanvas;
    this.location = new Location(parentWidth - this.width, 0);

    this.borderWidth = 1;
    this.borderColor = '#000000';

    this.background = '#cccccc';

    this.isDisplayed = true;

    this.initItems();
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
   * @param  {[type]} text: string        [description]
   */
  constructor(text: string) {
    super(text);

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
    data.isValidCanvasState = false;
  }

  /**
   * [deselect description]
   */
  deselect() {
    this.isSelected = false;
    data.isValidCanvasState = false;
  }

  /**
   * [isHover description]
   * @param  {[type]}  mousePos [description]
   * @return {Boolean}          [description]
   */
  isHover(mousePos: Object): boolean {
    return isElementHover(this, mousePos);
  }
}
