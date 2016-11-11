// for typings only
import {ViewSlot} from 'aurelia-framework';

export class ViewSlots {
  public leftRowViewSlots: Array<ViewSlot>;
  public mainRowViewSlots: Array<ViewSlot>;
  public rightRowViewSlots: Array<ViewSlot>;
  public groupRowViewSlots: Array<ViewSlot>;
  public leftHeaderViewSlot: ViewSlot;
  public mainHeaderViewSlot: ViewSlot;
  public rightHeaderViewSlot: ViewSlot;
  public mainViewSlot: ViewSlot;
  public loadingScreenViewSlot: ViewSlot;
  public contextMenu: ViewSlot;
  public groupingViewSlots: Array<ViewSlot>;


  // plan was to keep all viewslots here so i can bind/unbind... but...
  constructor() {

    this.leftRowViewSlots = [];
    this.mainRowViewSlots = [];
    this.rightRowViewSlots = [];
    this.groupRowViewSlots = [];

    this.leftHeaderViewSlot = null;
    this.mainHeaderViewSlot = null;
    this.rightHeaderViewSlot = null;

    this.mainViewSlot = null;

    this.loadingScreenViewSlot = null;

    this.groupingViewSlots = [];

    this.contextMenu = null;

  }

  public bindAndAttachColumns(overrideContext: any, columnBindingContext: any): void {

    let context = {};
    let newParentOverrideContext = {
      bindingContext: columnBindingContext,
      parentOverrideContext: overrideContext
    };


    for (let i = 0; i < this.groupRowViewSlots.length; i++) {
      // one for each row.
      context = {};

      this.leftRowViewSlots[i].bind(context, {
        bindingContext: context,
        parentOverrideContext: newParentOverrideContext
      });
      this.leftRowViewSlots[i].attached();

      this.mainRowViewSlots[i].bind(context, {
        bindingContext: context,
        parentOverrideContext: newParentOverrideContext
      });
      this.mainRowViewSlots[i].attached();

      this.rightRowViewSlots[i].bind(context, {
        bindingContext: context,
        parentOverrideContext: newParentOverrideContext
      });
      this.rightRowViewSlots[i].attached();

      this.groupRowViewSlots[i].bind(context, {
        bindingContext: context,
        parentOverrideContext: newParentOverrideContext
      });
      this.groupRowViewSlots[i].attached();
    }

    this.leftHeaderViewSlot.bind(context, {
      bindingContext: context,
      parentOverrideContext: newParentOverrideContext
    });
    this.leftHeaderViewSlot.attached();

    this.mainHeaderViewSlot.bind(context, {
      bindingContext: context,
      parentOverrideContext: newParentOverrideContext
    });
    this.mainHeaderViewSlot.attached();

    this.rightHeaderViewSlot.bind(context, {
      bindingContext: context,
      parentOverrideContext: newParentOverrideContext
    });
    this.rightHeaderViewSlot.attached();

  }


  public unbindAndDetachColumns(): void {
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
