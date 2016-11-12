import { Controller } from '../interfaces';


export class ColumnBindingContext {
  public setupleft: Array<any>;
  public setupmain: Array<any>;
  public setupright: Array<any>;
  public setupgroup: Array<any>;
  public setupgrouping: number;
  public changeGrouping: Function;
  private controller: Controller;


  constructor(controller: Controller) {
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
