
const constants = require('../constants.js');
const views = require('../core/views.js');
const utils = require('../core/utils.js');


export class MenuView extends views.UIView {

  onClick(event) {
    let mousePosition = utils.getMousePos(event);
    for (let item of this.element.children){
      if(item.isHover(mousePosition)){
        item.select();
      } else {
        item.deselect();
      }
    };
  }

};
