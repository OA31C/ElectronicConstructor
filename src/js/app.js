import '../css/main.css';

const constants = require('./constants.js');
const coreModels = require('./core/models.js');
const menu = require('./menu');


class App {

  constructor() {

    this.width       = 0;                  // type: Number
    this.height      = 0;                  // type: Number

    this.menu        = null;               // type: Menu
    this.linesDrawer = null;               // type: LinesDrawer

    this.children    = null;               // type: UIElementsList
  }

  init() {
    this._canvasSetup();

    // ###### MENU ######
    this.menu        = new menu.Menu(this);
    new menu.MenuView(this.menu);
  }

  _canvasSetup() {
    this.width  = window.innerWidth;
    this.height = window.innerHeight;

    this._qualitySetup();
  }

  _qualitySetup() {
    let devicePixelRatio = window.devicePixelRatio || 1;
    let backingStoreRatio = constants.canvasCtx.webkitBackingStorePixelRatio ||
                            constants.canvasCtx.mozBackingStorePixelRatio ||
                            constants.canvasCtx.msBackingStorePixelRatio ||
                            constants.canvasCtx.oBackingStorePixelRatio ||
                            constants.canvasCtx.backingStorePixelRatio || 1;
    let ratio = devicePixelRatio / backingStoreRatio;
    constants.canvas.width = this.width * ratio;
    constants.canvas.height = this.height * ratio;
    constants.canvas.style.width = this.width + 'px';
    constants.canvas.style.height = this.height + 'px';
    constants.canvasCtx.scale(ratio, ratio);
  }

  get childrenListClass() {
    return coreModels.UIElementsList;
  }

}

// remove it later
window.app = new App();
window.app.init();
window.constants = constants;
