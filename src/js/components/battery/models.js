import {Location, UIElement} from '../../core/base/models';
import {createElement} from '../index';
import {LineCtrl} from '../line/controllers';


export class Battery extends UIElement {
  img: string;
  line: LineCtrl;

  constructor({location}) {
    super();
    this.location = location;
    this.width = 50;
    this.height = 50;

    this.img = 'battery/battery.png';

    this.line = createElement(
      'line', {
        startPoint: new Location(this.location.x-5, this.location.y + (this.height / 2)),
        endPoint: new Location(this.location.x+5 + this.width, this.location.y + (this.height / 2)),
        mutable: false,
      }
    );
  }
}
