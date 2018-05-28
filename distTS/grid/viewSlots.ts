import {
  ViewSlot,
  BindingContextInterface,
  HeaderCacheInterface,
  RowCacheInterface,
  OverrideContextInterface,
  HtmlCache,
  ColumnBindingContext,
  SelectionInterface
} from '../interfaces';



/**
 * This holds all the grids viewslots, so its easy to bind and attach and unbind/detach when removed
 *
 */
export class ViewSlots {
  public leftRowViewSlots: ViewSlot[];
  public mainRowViewSlots: ViewSlot[];
  public rightRowViewSlots: ViewSlot[];
  public groupRowViewSlots: ViewSlot[];
  public leftHeaderViewSlot: ViewSlot;
  public mainHeaderViewSlot: ViewSlot;
  public rightHeaderViewSlot: ViewSlot;
  public mainViewSlot: ViewSlot;
  public loadingScreenViewSlot: ViewSlot;
  public footerViewSlot: ViewSlot;
  public contextMenu: ViewSlot;
  public groupingViewSlots: ViewSlot[];
  private rowCache: RowCacheInterface[];
  private headerCache: HeaderCacheInterface;



  constructor(htmlCache: HtmlCache) {
    this.rowCache = htmlCache.rowCache;
    this.headerCache = htmlCache.headerCache;
    this.leftRowViewSlots = [];
    this.mainRowViewSlots = [];
    this.rightRowViewSlots = [];
    this.groupRowViewSlots = [];

    // header view slots
    this.leftHeaderViewSlot = null;
    this.mainHeaderViewSlot = null;
    this.rightHeaderViewSlot = null;

    // entire grid markup / skeleton
    this.mainViewSlot = null;

    // misc other viewslots
    this.loadingScreenViewSlot = null;
    this.groupingViewSlots = [];
    this.contextMenu = null;

    // grouping elements viewslots is not here... see GroupingElements class

  }



  /**
   * Bind and attaches the viewslots
   * Called when created, and reattached after if.bind is used
   *
   */
  public bindAndAttachColumns(
    overrideContext: OverrideContextInterface,
    columnBindingContext: ColumnBindingContext,
    curSelection: SelectionInterface): void {

    let context: BindingContextInterface;

    // create a extra parent override context so we can add
    // overrideContext from model holding grid and columnbinding
    let newParentOverrideContext = {
      bindingContext: columnBindingContext,
      parentOverrideContext: overrideContext
    };

    for (let i = 0; i < this.rowCache.length; i++) {
      // one for each row.
      context = ({rowRef: {}, tempRef: {}} as BindingContextInterface);

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

    // add selection to the context, so we can control selection (delselect/select all)
    context = ({ selection: curSelection } as BindingContextInterface);
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

    // todo loading screen and footer?

  }



  /**
   * Unbinds and detach all the viewslots
   * usually called during grids unbind event
   *
   */
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

     // todo loading screen and footer, or grouping elements?

  }

  /**
   * removes all viewslots
   * Todo, is this even in use?
   *
   */
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

    // todo loading screen and footer, or grouping elements?
  }

}
