//for typings only
import {Controller} from './controller'


export class ColumnBindingContext {
  controller:Controller;
  setupleft:Array<any>;
  setupmain:Array<any>;
  setupright:Array<any>;
  setupgroup:Array<any>;
  setupgrouping:number;
  changeGrouping:Function;


  constructor(controller:Controller) {
    this.controller = controller;
    this.setupleft = [];
    this.setupmain = [];
    this.setupright = [];
    this.setupgroup = [];
    this.setupgrouping = 0;
    this.changeGrouping = (x) => {
      if (x) {
        if (x.__groupExpanded) {
          this.controller.collapseGroup(x.__groupID);
        } else {
          this.controller.expandGroup(x.__groupID);
        }

      }

    };

  }


}
