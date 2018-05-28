import { Controller, ColumBindingContextObjectInterface, EntityInterface } from '../interfaces';

/**
 * Columns context object
 * Helps control the columns/rows get groups etc
 *
 */
export class ColumnBindingContext {
  public setupleft: ColumBindingContextObjectInterface[];
  public setupmain: ColumBindingContextObjectInterface[];
  public setupright: ColumBindingContextObjectInterface[];
  public setupgroup: ColumBindingContextObjectInterface[];
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
    this.changeGrouping = (x: EntityInterface) => {
      if (x) {
        if (x.__groupExpanded) {
          this.controller.collapseGroup(x.__groupID);
        } else {
          this.controller.expandGroup(x.__groupID);
        }

      }

    };

  }



  /**
   * todo description
   *
   */
  public clear() {
    this.setupleft = [];
    this.setupmain = [];
    this.setupright = [];
    this.setupgroup = [];
    this.setupgrouping = 0;
    this.changeGrouping = (x: EntityInterface) => {
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
