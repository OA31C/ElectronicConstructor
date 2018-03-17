
const constants = require('../../constants.js');
const data = require('../../data.js');
const models = require('./models.js');
const utils = require('../utils.js');


export class UIView {

  constructor(element) {
    this.element = element;

    setInterval(this.redraw.bind(this), 1000 / constants.FPS);
  }

  clear() {
    constants.canvasCtx.clearRect(this.element.location.x,
                                  this.element.location.y,
                                  this.element.width,
                                  this.element.height);
  }

  redraw() {
    if (data.isValidCanvasState) return;
    this.clear();
    this.draw(this.element);
    data.isValidCanvasState = true;
  }

  /**
  * @param  {UIElement} element
  */
  drawBackground(element) {
    if (!element.background) return;
    constants.canvasCtx.fillStyle = element.background;
    constants.canvasCtx.fillRect(element.location.x, element.location.y, element.width, element.height);
  }

  /**
  * @param  {UIElement} element
  */
  drawBorder(element) {
    let isBorder = false;
    if (element.borderWidth) {
      constants.canvasCtx.lineWidth = element.borderWidth;
      isBorder = true;
    };
    if (element.strokeStyle) {
      constants.canvasCtx.strokeStyle = element.borderColor;
      isBorder = true;
    };
    if (isBorder) {
      constants.canvasCtx.strokeRect(element.location.x, element.location.y, element.width, element.height);
    };
  }

  /**
   * draws element and its children and every child's children
   * @param  {UIElement} element : element that's needed to draw, and its instances
   */
  draw(element, elementNum=1) {
    this.drawElement(element, elementNum);
    if (element.children === null) return;
    element.children.forEach((child, index) => {
      this.draw(child, ++index);  // draw child's children
    });
  }

  drawText(element, elementNum) {
    constants.canvasCtx.fillStyle = element.textColor;
    constants.canvasCtx.font = `${element.textSize}px ${element.textFont}`;
    if (element.isSelected) { // FIXME
      constants.canvasCtx.font = "bold " + constants.canvasCtx.font;
    };
    constants.canvasCtx.textAlign = element.textAlign;

    // center by width of the element rect
    // FIXME: add `if` for check whether textAlign === center
    let posX = this.element.location.x + this.element.width / 2;
    // concatenates font sizes of all items above and current + concatenates top margin of all items above and current
    let posY = element.textSize * elementNum + element.topMargin * elementNum;

    constants.canvasCtx.fillText(element.text, posX, posY);

    element.width = constants.canvasCtx.measureText(element.text).width;
    element.height = element.textSize;

    // FIXME: should it be in drawElement method maybe? before drawBackground
    // FIXME: remove it
    // use the next algorithm:
    // 1) if item doesn't have location:
    //   - set location to the nearest X, Y:
    //     * where it isn't filled by another element
    //     * check whether height and width also isn't filled
    //     + top and left margin
    // ...

    // TODO: get X position for centered text element
    let x = element.parent.location.x + (element.parent.width / 2) - (element.width / 2);
    let y = posY-element.textSize;
    element.location = new models.Location(x, y);
  }

  /**
  * @param  {UIElement} element
  */
  drawElement(element, elementNum) {
    if (!element.isDisplayed) return;

    this.drawBackground(element);
    this.drawBorder(element);

    if (element instanceof models.UIText) this.drawText(element, elementNum);
  }

}
