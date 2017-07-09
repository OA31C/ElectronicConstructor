const constants = require('./constants.js');
const coreModels = require('./core/models.js');

export class Menu extends coreModels.UIElement {

  constructor(app, partOfCanvas) {
    super();

    this.app = app;

    // size, that will be cut for menu
    // example: (c = canvas, m = menu, part = 4)
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    this.partOfCanvas = 5;           // type: Number

    this.width = app.width / this.partOfCanvas;
    this.height = app.height;
    this.posX = app.width - this.width;
    this.posY = 0;

    this.borderWidth = 1;
    this.borderColor = '#000000';

    this.background = '#cccccc';

    this.items = new MenuItemsList(this);

    this.initItems();
    this.show();

  }

  initItems() {
    this.addItem(new MenuItem(this, 'Copper'));
    this.addItem(new MenuItem(this, 'another item'));
  }

  show() {
    super.show();
    this.app.isValidCanvasState = false;
  }

  hide() {
    super.hide();
    this.app.isValidCanvasState = false;
  }

  drawBackground() {
    constants.canvasCtx.fillStyle = this.background;
    constants.canvasCtx.fillRect(this.posX, this.posY, this.width, this.height);
  }

  drawBorder() {
    constants.canvasCtx.lineWidth = this.borderWidth;
    constants.canvasCtx.strokeStyle = this.borderColor;
    constants.canvasCtx.strokeRect(this.posX, this.posY, this.width, this.height);
  }

  // move the method out of model class
  draw() {
    if (!this.isDisplayed) return;
    this.drawBackground();
    this.drawBorder();
    this.items.draw();
  }

  get itemsListClass() {
    return MenuItemsList;
  }

}

class MenuItemsList extends coreModels.UIElementsList {

  constructor(menu, ...items) {
    super(...items);
    this.menu = menu;
  }

  // move the method out of model class
  /**
   * draws all items of the list
   */
  draw() {
    this.displayedItems.forEach((item, i) => item.draw(this.menu, i), 0, true);
  }

  get displayedItems() {
    return this.filter(item => item.isDisplayed);
  }

  get displayedItemsLength() {
    return this.displayedItems.length;
  }

  get length() {
    return this.items.length;
  }

}

class MenuItem extends coreModels.UIText {

  constructor(menu, text) {
    super();

    this.menu = menu;
    this.text = text;

    this.textColor = '#000000';
    this.textFont = 'Tahoma';
    this.textSize = 18;

    this.topMargin = 10;

    this.isDisplayed = true;
    this.isSelected = false;
  }

  show() {
    super.show();
    this.menu.app.isValidCanvasState = false;
  }
  hide() {
    super.hide();
    this.menu.app.isValidCanvasState = false;
  }

  select() {
    this.isSelected = true;
    this.menu.app.isValidCanvasState = false;
  }
  deselect() {
    this.isSelected = false;
    this.menu.app.isValidCanvasState = false;
  }

  // move the method out of model class
  /**
   * @param  {Menu} menu
   * @param  {number} itemIndex index of the item in MenuItemsList
   */
  draw(menu, itemIndex) {
    if (!this.isDisplayed) return;

    constants.canvasCtx.fillStyle = this.textColor;
    constants.canvasCtx.font = `${this.textSize}px ${this.textFont}`;
    constants.canvasCtx.textAlign = "center";

    let itemInListNum = ++itemIndex;
    // center by width of the menu rect
    let posX = menu.posX + menu.width / 2;
    // concatenates font sizes of all items above and current + concatenates top margin of all items above and current
    let posY = this.textSize * itemInListNum + this.topMargin * itemInListNum;

    constants.canvasCtx.fillText(this.text, posX, posY);
  }

}
