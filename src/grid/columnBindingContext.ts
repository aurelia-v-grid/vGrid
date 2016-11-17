import { Controller, ColumBindingContextObject, Entity } from '../interfaces';


export class ColumnBindingContext {
  public setupleft: Array<ColumBindingContextObject>;
  public setupmain: Array<ColumBindingContextObject>;
  public setupright: Array<ColumBindingContextObject>;
  public setupgroup: Array<ColumBindingContextObject>;
  public setupgrouping: number;
  public changeGrouping: Function;
  private controller: Controller;
  [key: string]: any;


  constructor(controller: Controller) {
    this.controller = controller;
    this.setupleft = [];
    this.setupmain = [];
    this.setupright = [];
    this.setupgroup = [];
    this.setupgrouping = 0;
    this.changeGrouping = (x: Entity) => {
      if (x) {
        if (x.__groupExpanded) {
          this.controller.collapseGroup(x.__groupID);
        } else {
          this.controller.expandGroup(x.__groupID);
        }

      }

    };

  }

  public clear() {
    this.setupleft = [];
    this.setupmain = [];
    this.setupright = [];
    this.setupgroup = [];
    this.setupgrouping = 0;
    this.changeGrouping = (x: Entity) => {
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
