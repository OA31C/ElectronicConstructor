import '../css/main.css';

const constants = require('./constants.js');
// const coreModels = require('./core/models.js');
// const menu = require('./menu');

/**
 * ...
 */
class App {
  background: string;
  width: number;
  height: number;

  /**
   * initializates default properties and starts main loop
   */
  constructor() {
    // *** PROPERTIES ***

    this.background = '#e3e172';
    this.width = 0;
    this.height = 0;
    this.height = ''; // REMOVE IT

    // *** Initializaions ***
    this._canvasSetup();
    this.render();
  }

  /**
   * [_canvasSetup description]
   */
  _canvasSetup() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this._qualitySetup();
  }

  /**
   * [_qualitySetup description]
   */
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

  /**
   * [childrenListClass description]
   * @return {[type]} [description]
   */
  get childrenListClass() {
    return coreModels.UIElementsList;
  }

  /**
   * [clear description]
   */
  clear() {
    constants.canvasCtx.clearRect(0, 0, this.width, this.height);
  }

  /**
   * [render description]
   */
  render() {
    this.clear();

    // render background
    constants.canvasCtx.fillStyle = this.background;
    constants.canvasCtx.fillRect(0, 0, this.width, this.height);

    // for (let child of this.children) {
    //   child.render();
    // };
  }
}

// remove it later
window.app = new App();
window.constants = constants;
