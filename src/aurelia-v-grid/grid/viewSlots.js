export class ViewSlots {
  //plan was to keep all viewslots here so i can bind/unbind... but...
  constructor() {

    this.leftRowViewSlots = [];
    this.mainRowViewSlots = [];
    this.rightRowViewSlots = [];
    this.groupRowViewSlots = [];

    this.leftHeaderViewSlot;
    this.mainHeaderViewSlot;
    this.rightHeaderViewSlot;

    this.mainViewSlot;

    this.loadingScreenViewSlot;

    this.groupingViewSlots = [];

    this.contextMenu;

  }

  bindAndAttachColumns(overrideContext, columnBindingContext) {

    let context = {};
    let parentOverrideContext = {
      bindingContext: columnBindingContext,
      parentOverrideContext: overrideContext
    };


    for (let i = 0; i < this.groupRowViewSlots.length; i++) {
      //one for each row.
      context = {};

      this.leftRowViewSlots[i].bind(context, {
        bindingContext: context,
        parentOverrideContext: parentOverrideContext
      });
      this.leftRowViewSlots[i].attached();

      this.mainRowViewSlots[i].bind(context, {
        bindingContext: context,
        parentOverrideContext: parentOverrideContext
      });
      this.mainRowViewSlots[i].attached();

      this.rightRowViewSlots[i].bind(context, {
        bindingContext: context,
        parentOverrideContext: parentOverrideContext
      });
      this.rightRowViewSlots[i].attached();

      this.groupRowViewSlots[i].bind(context, {
        bindingContext: context,
        parentOverrideContext: parentOverrideContext
      });
      this.groupRowViewSlots[i].attached();
    }

    this.leftHeaderViewSlot.bind(context, {
      bindingContext: context,
      parentOverrideContext: parentOverrideContext
    });
    this.leftHeaderViewSlot.attached();

    this.mainHeaderViewSlot.bind(context, {
      bindingContext: context,
      parentOverrideContext: parentOverrideContext
    });
    this.mainHeaderViewSlot.attached();

    this.rightHeaderViewSlot.bind(context, {
      bindingContext: context,
      parentOverrideContext: parentOverrideContext
    });
    this.rightHeaderViewSlot.attached();

  }


  unbindAndDetachColumns() {
    for (let i = 0; i < this.groupRowViewSlots.length; i++) {

      this.leftRowViewSlots[i].unbind();
      this.leftRowViewSlots[i].detached();

      this.mainRowViewSlots[i].unbind();
      this.mainRowViewSlots[i].detached();

      this.rightRowViewSlots[i].unbind();
      this.rightRowViewSlots[i].detached();

      this.groupRowViewSlots[i].unbind();
      this.groupRowViewSlots[i].detached();
    }

    this.leftHeaderViewSlot.unbind();
    this.leftHeaderViewSlot.detached();

    this.mainHeaderViewSlot.unbind();
    this.mainHeaderViewSlot.detached();

    this.rightHeaderViewSlot.unbind();
    this.rightHeaderViewSlot.detached();

  }


}
