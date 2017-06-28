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

  /**[draw description]
   * @param  {Menu} menu
   * @param  {number} itemIndex index of the item in MenuItemsList
   */
  draw(menu, itemIndex) {
    if (!this.isDisplayed) return;

    menu.ctx.fillStyle = menu.itemTextColor;
    menu.ctx.font = `${menu.itemTextSize}px ${menu.itemTextFont}`;
    menu.ctx.textAlign = "center";

    let itemInListNum = ++itemIndex;
    // center by width of the menu rect
    let posX = menu.posX + menu.width / 2;
    // concatenates font sizes of all items above and current + concatenates top margin of all items above and current
    let poxY = menu.itemTextSize * itemInListNum + menu.itemTopMargin * itemInListNum;
    menu.ctx.fillText(this.text, posX, poxY);
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

class Menu {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // size, that will be cut for menu
    // example: (c = canvas, m = menu, part = 4)
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    // ccccccccccccccccccccccccmmmmmmmm
    this.partOfCanvas = 5;

    this.width = this.canvas.width / this.partOfCanvas;
    this.height = this.canvas.height;
    this.posX = this.canvas.width - this.width;
    this.posY = 0;

    this.isDisplayed = true;

    this.borderWidth = 2;
    this.borderColor = '#000000';

    this.backgroundColor = '#cccccc';

    this.items = new MenuItemsList(this);
    this.itemTopMargin = 10;
    this.itemTextSize = 18;
    this.itemTextFont = 'Tahoma';
    this.itemTextColor = '#000000';

    // TODO: move these constants to settings.js
    this.FPS = 60;

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
    setInterval(() => this.mainLoop(), 1000 / this.FPS);
  }

  drawBorder() {
    this.ctx.lineWidth = this.borderWidth;
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.strokeRect(this.posX, this.posY, this.width, this.height);
  }

  drawBackground() {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }

  draw() {
    if (!this.isDisplayed) return;
    this.drawBackground();
    this.drawBorder();
    this.items.draw();
  }

  clear() {
    this.ctx.clearRect(this.posX, this.posY, this.width, this.height);
  }

  redraw() {
    this.clear();
    this.draw();
  }

  mainLoop() {
    this.redraw();
  }

}


class App {

  constructor(canvasSelector) {
    // canvas init
    this.canvas = document.getElementById(canvasSelector);
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = this.canvas.getContext('2d');

    this.menu = new Menu(this.canvas);

    // TODO: move these constants to settings.js
    this.FPS = 60;
  }

  init() {
    // this.initEvents();
    // setInterval(() => this.mainLoop(), 1000 / this.FPS);
  }

  initEvents() {
    this.canvas.onmousemove = (e) => this.onMouseMove(e);
    this.canvas.ondblclick = (e) => this.onDoubleClick(e);
    this.canvas.onmousedown = (e) => this.onMouseDown(e);
    this.canvas.onmouseup = (e) => this.onMouseUp(e);
  }

  mainLoop() {
    this.redraw();
  }

  onMouseMove(event) {
    let mousePos = this.getMousePos(event);
  }

  onDoubleClick(event) {
    let mousePos = this.getMousePos(event);
  }

  onMouseDown(event) {
    let mousePos = this.getMousePos(event);
  }

  onMouseUp(event) {
    this.deselectElements();
    this.canvas.style.cursor = 'default';
  }

  isElementHover(element, mousePos) {
    return (mousePos.x >= element.posX) && (element.posX + element.width >= mousePos.x) &&
           (mousePos.y >= element.posY) && (element.posY + element.height >= mousePos.y);
  }

  getMousePos(event) {
    let canvasRect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - canvasRect.left,
      y: event.clientY - canvasRect.top
    }
  }


  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    
  }

  redraw() {
    this.clear();
    this.draw();
  }

}

let app = new App('app');
app.init();
