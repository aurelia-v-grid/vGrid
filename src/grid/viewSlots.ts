import {
  ViewSlot,
  BindingContext,
  HeaderCache,
  RowCache,
  OverrideContext,
  HtmlCache,
  ColumnBindingContext,
  SelectionInterface
} from '../interfaces';


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
  private rowCache: Array<RowCache>;
  private headerCache: HeaderCache;


  // plan was to keep all viewslots here so i can bind/unbind... but...
  constructor(htmlCache: HtmlCache) {
    this.rowCache = htmlCache.rowCache;
    this.headerCache = htmlCache.headerCache;
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

  public bindAndAttachColumns(overrideContext: OverrideContext, columnBindingContext: ColumnBindingContext, curSelection: SelectionInterface): void {

    let context: BindingContext;

    let newParentOverrideContext = {
      bindingContext: columnBindingContext,
      parentOverrideContext: overrideContext
    };


    for (let i = 0; i < this.rowCache.length; i++) {
      // one for each row.
      context = ({} as BindingContext);

      this.rowCache[i].bindingContext = context;
      this.rowCache[i].parentOverrideContext = {
        bindingContext: context,
        parentOverrideContext: newParentOverrideContext
      };

      this.leftRowViewSlots[i].bind(this.rowCache[i].bindingContext, this.rowCache[i].parentOverrideContext);
      this.leftRowViewSlots[i].attached();

      this.mainRowViewSlots[i].bind(this.rowCache[i].bindingContext, this.rowCache[i].parentOverrideContext);
      this.mainRowViewSlots[i].attached();

      this.rightRowViewSlots[i].bind(this.rowCache[i].bindingContext, this.rowCache[i].parentOverrideContext);
      this.rightRowViewSlots[i].attached();

      this.groupRowViewSlots[i].bind(this.rowCache[i].bindingContext, this.rowCache[i].parentOverrideContext);
      this.groupRowViewSlots[i].attached();
    }



    context = ({selection: curSelection} as BindingContext);
    this.headerCache.bindingContext = context;
    this.headerCache.parentOverrideContext = {
      bindingContext: context,
      parentOverrideContext: newParentOverrideContext
    };

    this.leftHeaderViewSlot.bind(this.headerCache.bindingContext, this.headerCache.parentOverrideContext);
    this.leftHeaderViewSlot.attached();

    this.mainHeaderViewSlot.bind(this.headerCache.bindingContext, this.headerCache.parentOverrideContext);
    this.mainHeaderViewSlot.attached();

    this.rightHeaderViewSlot.bind(this.headerCache.bindingContext, this.headerCache.parentOverrideContext);
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

  public clear(): void {
    for (let i = 0; i < this.groupRowViewSlots.length; i++) {
      this.leftRowViewSlots[i].removeAll();
      this.mainRowViewSlots[i].removeAll();
      this.rightRowViewSlots[i].removeAll();
      this.groupRowViewSlots[i].removeAll();
    }

    this.leftHeaderViewSlot.removeAll();
    this.mainHeaderViewSlot.removeAll();
    this.rightHeaderViewSlot.removeAll();

    this.leftRowViewSlots = null;
    this.mainRowViewSlots = null;
    this.rightRowViewSlots = null;
    this.groupRowViewSlots = null;
    this.leftRowViewSlots = [];
    this.mainRowViewSlots = [];
    this.rightRowViewSlots = [];
    this.groupRowViewSlots = [];

    this.leftHeaderViewSlot = null;
    this.mainHeaderViewSlot = null;
    this.rightHeaderViewSlot = null;
  }


}
