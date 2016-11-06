export class ColumnBindingContext {

  constructor(controller) {
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
