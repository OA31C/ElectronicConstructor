const constants = require('../constants.js');
const coreModels = require('../core/models.js');
const utils = require('../core/utils.js');
const data = require('../data.js');

export class Menu extends coreModels.UIElement {

  constructor(parent) {
    super(parent);

    // size, that will be cut for menu
    // example: (c = canvas, m = menu, part = 4)
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    this.partOfCanvas = 5;           // type: Number

    this.setWidth();
    this.height = parent.height;
    this.location = new coreModels.Location(parent.width, 0);

    this.borderWidth = 1;
    this.borderColor = '#000000';

    this.background = '#cccccc';

    this.isDisplayed = true;

    this.initItems();
  }

  initItems() {
    new MenuItem(this, '-------------');
    new MenuItem(this, 'Copper');
    new MenuItem(this, 'another item');
  }

  setWidth(value) {
    if (!value) {
      value = this.parent.width / this.partOfCanvas;
    }
    this.width = value;
    this.parent.width -= value;
  }

}

class MenuItem extends coreModels.UIText {

  constructor(parent, text) {
    super(parent);

    this.text = text;

    this.textAlign = 'center';
    this.textColor = '#000000';
    this.textFont = 'Tahoma';
    this.textSize = 18;

    this.topMargin = 10;

    this.isDisplayed = true;
    this.isSelected = false;
  }

  select() {
    this.isSelected = true;
    data.isValidCanvasState = false;
  }
  deselect() {
    this.isSelected = false;
    data.isValidCanvasState = false;
  }

  isHover(mousePos) {
    return utils.isElementHover(this, mousePos);
  }

}
