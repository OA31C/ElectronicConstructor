
const constants = require('../constants.js');
const views = require('../core/views.js');
const utils = require('../core/utils.js');


export class MenuView extends views.UIView {

  constructor(element) {
    super(element);
    this.initEvents();
  }

  initEvents() {
    constants.canvas.addEventListener('click', (e) => this.onClicked(e));
  }  

  onClicked(e) {
    let mousePosition = utils.getMousePos(e);
    for (let item of this.element.children){
      if(item.isHover(mousePosition)){
        item.select();
      } else {
        item.deselect();
      }
    };
  }

};
