
const constants = require('../constants.js');
const views = require('../core/views.js');
const utils = require('../core/utils.js');


export class MenuView extends views.UIView {

  onClick(self, event) {
    let mousePosition = utils.getMousePos(event);
    for (let item of self.element.children){
      if(item.isHover(mousePosition)){
        item.select();
      } else {
        item.deselect();
      }
    };
  }

};
