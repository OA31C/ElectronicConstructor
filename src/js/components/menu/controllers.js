const coreControllers = require('../../core/base/controllers.js');


export class MenuCtrl extends coreControllers.UICtrl {

  onClick(event) {
    const mousePosition = utils.getMousePos(event);
    for (const item of this.element.children) {
      if (item.isHover(mousePosition)) {
        item.select();
      } else {
        item.deselect();
      }
    };
  }

}
