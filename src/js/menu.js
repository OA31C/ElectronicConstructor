
export class Menu {

  constructor(app) {

    this.app = app;

    // size, that will be cut for menu
    // example: (c = canvas, m = menu, part = 4)
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    this.partOfCanvas = 5;

    this.width = app.width / this.partOfCanvas;
    this.height = app.height;
    this.posX = app.width - this.width;
    this.posY = 0;

    this.isDisplayed = true;

    this.borderWidth = 1;
    this.borderColor = '#000000';

    this.backgroundColor = '#cccccc';

    this.items = new MenuItemsList(this);
    this.itemTopMargin = 10;
    this.itemTextSize = 18;
    this.itemTextFont = 'Tahoma';
    this.itemTextColor = '#000000';

    this.init();
  }

  initItems() {
    this.items.add('Copper');
    this.items.add('another item');
  }

  show() {
    this.isDisplayed = true;
  }

  hide() {
    this.isDisplayed = false;
  }

  init() {
    this.initItems();
  }

  drawBorder() {
    this.app.ctx.lineWidth = this.borderWidth;
    this.app.ctx.strokeStyle = this.borderColor;
    this.app.ctx.strokeRect(this.posX, this.posY, this.width, this.height);
  }

  drawBackground() {
    this.app.ctx.fillStyle = this.backgroundColor;
    this.app.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }

  draw() {
    if (!this.isDisplayed) return;
    this.drawBackground();
    this.drawBorder();
    this.items.draw();
  }

}

class MenuItemsList {

  constructor(menu, ...items) {
    this.menu = menu;
    this.items = items;
  }

  /**
   * draws all items of the list
   */
  draw() {
    this.forEach((item, i) => item.draw(this.menu, i), 0, true);
  }

  /**
   * adds an item to items list
   * @param {MenuItem or string} item : item's text or whole MenuItem instance
   * @return {MenuItemsList}
   */
  add(item) {
    if (item.constructor !== MenuItem) {
      item = new MenuItem(this.menu, item);
    };
    this.items.push(item);
    return this.items;
  }

  /**
   * removes item from list by its text value or instance
   * @param  {MenuItem or string} item
   * @return {MenuItemsList}
   */
  remove(item) {
    if (item.constructor === MenuItem) {
      item = item.text;
    };
    this.items = this.items.filter(e => e.text !== item);
    return this.items;
  }

  /**
   * @param  {Function} callback : takes 2 arguments (currentValue, index)
   * @param  {number} sets : index value at begin
   * @param  {boolean} displayedOnly : iterates by displayed items only
   */
  forEach(callback, start=0, displayedOnly=false) {
    let items;
    if (displayedOnly) {
      items = this.displayedItems;
    } else {
      items = this.items;
    }
    for (let i = start, len = items.length+start; i < len; i++) {
      callback(items[i-start], i);
    }
  }

  get displayedItems() {
    return this.items.filter(item => item.isDisplayed);
  }

  get displayedItemsLength() {
    return this.displayedItems.length;
  }

  get length() {
    return this.items.length;
  }

}

class MenuItem {

  constructor(menu, text) {
    this.menu = menu;
    this.text = text;

    this.isDisplayed = true;
    this.isSelected = false;
  }

  show() {
    this.isDisplayed = true;
  }
  hide() {
    this.isDisplayed = false;
  }

  select() {
    this.isSelected = true;
  }
  deselect() {
    this.isSelected = false;
  }

  /**
   * @param  {Menu} menu
   * @param  {number} itemIndex index of the item in MenuItemsList
   */
  draw(menu, itemIndex) {
    if (!this.isDisplayed) return;

    menu.app.ctx.fillStyle = menu.itemTextColor;
    menu.app.ctx.font = `${menu.itemTextSize}px ${menu.itemTextFont}`;
    menu.app.ctx.textAlign = "center";

    let itemInListNum = ++itemIndex;
    // center by width of the menu rect
    let posX = menu.posX + menu.width / 2;
    // concatenates font sizes of all items above and current + concatenates top margin of all items above and current
    let poxY = menu.itemTextSize * itemInListNum + menu.itemTopMargin * itemInListNum;
    menu.app.ctx.fillText(this.text, posX, poxY);
  }

}
