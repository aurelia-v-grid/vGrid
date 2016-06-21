declare module 'aurelia-v-grid' {
  import {
    Aurelia,
    inject,
    customAttribute,
    BindingEngine,
    noView,
    customElement,
    bindable,
    processContent,
    TargetInstruction,
    Container,
    ViewSlot,
    TaskQueue,
    ViewCompiler,
    ViewResources,
    containerless
  } from 'aurelia-framework';
  
  /**
  * Plugin configuration builder
  */
  export class ConfigBuilder {
    globalResources: any;
  }
  export function configure(aurelia: Aurelia, configCallback?: ((builder: ConfigBuilder) => void)): any;
  export function configure(config: any): any;
  
  /*****************************************************************************************************************
   *    ContextMenu
   *    This is where I create all the <v-grid> attributes, and set then to vGridConfig
   *    Main idea/source https://github.com/callmenick/Custom-Context-Menu
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  /*****************************************************
   *  context menu for header
   ******************************************************/
  export class VGridHeaderMenu extends Contextmenu {
    classToOpenOn: any;
    
    //class it opens menu on
    altMenuLogic: any;
    
    //alt menu to open
    //main menu listener
    menuItemListener(link: any): any;
    canOpen(): any;
    
    //main menu to open
    menuHtmlMain(): any;
    
    //alt menu I manually set
    menuHtmlSetFilter(): any;
    defaultMenu(value: any): any;
    triggerEvent(name: any, data: any): any;
    filterMenuLogic(value: any): any;
  }
  
  //reset to main menu again
  /*****************************************************
   *  main context menu for row cells
   ******************************************************/
  export class ContextRowMenu extends Contextmenu {
    classToOpenOn: any;
    
    //class it opens menu on
    altMenuLogic: any;
    
    //alt menu to open
    //main menu listener
    menuItemListener(link: any): any;
    canOpen(): any;
    
    //main menu to open
    menuHtmlMain(): any;
    defaultMenu(value: any): any;
  }
  
  /*****************************************************************************************************************
   *    Drag drop columns for the grid
   *    can not be used with row-repeat... yet
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class vGridDragDropCol {
    constructor(element: any, vGrid: any);
    bind(bindingContext: any, overrideContext: any): any;
    attached(): any;
    
    /***************************************************
       * sets drag handle
       *****************************************************/
    setDragHandles(): any;
    
    /***************************************************
       * sets the elements draggable attribute
       *****************************************************/
    setDraggable(newStatus: any): any;
    
    /***************************************************
       * updates columns
       *****************************************************/
    updateColumns(): any;
    
    /***************************************************
       * when starting dragging
       *****************************************************/
    onDragStart(evt: any): any;
    
    /***************************************************
       * when dragging over event(moving)
       *****************************************************/
    onDragOver(evt: any): any;
    
    /***************************************************
       * when drag event have ended
       *****************************************************/
    onDragEnd(evt: any): any;
  }
  
  /*****************************************************************************************************************
   *    Attributes for header so users can add to headers to activate filtering
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class vGridAttributesFilter {
    constructor(element: any, vGrid: any);
    valueConverters: any;
    bind(bindingContext: any, overrideContext: any): any;
    checkParams(value: any): any;
    getValue(): any;
    resetValue(): any;
    updateFilter(curFilter: any): any;
    attached(): any;
  }
  
  /*****************************************************************************************************************
   *    quickfix/hack until they fix this
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class vGridAttributesImageFix {
    constructor(element: any, vGrid: any);
    bind(bindingContext: any, overrideContext: any): any;
    attached(): any;
  }
  
  /*****************************************************************************************************************
   *    Attributes for tabbing, keyup/down and page up/down
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class vGridAttributesKeyMove {
    constructor(element: any, vGrid: any);
    bind(bindingContext: any, overrideContext: any): any;
    attached(): any;
    
    /***************************************************************************************
       * for setting next cell ny similating a mouse click, used for tabbing etc
       ***************************************************************************************/
    dispatchCellClick(index: any): any;
    
    /***************************************************************************************
       * sets "the cells" from  to direction asked for, so tabbing jumps to next row
       ***************************************************************************************/
    setCellsFromElement(node: any, direction: any): any;
    
    /***************************************************************************************
       * sets "the cells" from a top value, used for page up/down
       ***************************************************************************************/
    setCellsFromTopValue(top: any): any;
    
    /***************************************************************************************
       * simple delay for the keydown events, like tabbing etc, so I cantrol the speed of it
       ***************************************************************************************/
    keyDownDelay(callback: any): any;
    
    /***************************************************************************************
       * get the index
       ***************************************************************************************/
    getIndex(): any;
    
    /***************************************************************************************
       * adds main keys, like arrow keys, tab, and page up/down
       ***************************************************************************************/
    addGridKeyListner(): any;
  }
  
  /*****************************************************************************************************************
   *    Just to have instant update on row events over to current entity
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class vGridAttributesObserveField {
    constructor(element: any, vGrid: any, bindingEngine: any);
    bind(bindingContext: any, overrideContext: any): any;
    unbind(): any;
  }
  
  /*****************************************************************************************************************
   *    Adds resizing to the columns
   *    Can not be used with row repeat... not atleast yet..
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class vGridAttributesResizeCol {
    constructor(element: any, vGrid: any);
    bind(bindingContext: any, overrideContext: any): any;
    attached(): any;
    
    /**************************************************
       *  when mouse button is let go
       **************************************************/
    onmouseup(): any;
    
    /**************************************************
       *  when mouse moving mouse
       **************************************************/
    onmousemove(e: any): any;
    
    /**************************************************
       *  updates the actual header/row column width
       **************************************************/
    updateHeader(e: any): any;
    
    /**************************************************
       *  when mouse down, resizing starts
       **************************************************/
    onmousedown(e: any): any;
  }
  
  /*****************************************************************************************************************
   *    Attributes for row/header, enables checkbox , manual selection much be used with this
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class vGridAttributesSelection {
    constructor(element: any, vGrid: any);
    bind(bindingContext: any, overrideContext: any): any;
    attached(): any;
  }
  
  /*****************************************************************************************************************
   *    Attributes for header, enables sorting
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class vGridAttributesSort {
    constructor(element: any, vGrid: any);
    bind(bindingContext: any, overrideContext: any): any;
    attached(): any;
    getSortIconMarkup(attribute: any): any;
  }
  
  /*****************************************************************************************************************
   *    VGridConfig
   *    This generates the config used by vGridgenerator, other classes also calls this to get the information, also have misc utillity functions
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class VGridConfig {
    
    /***************************************************************************************
       * CSS classes used by grid
       ***************************************************************************************/
    css: any;
    
    /***************************************************************************************
       * different attributes used by grid
       ***************************************************************************************/
    atts: any;
    
    /***************************************************************************************
       * default settings, v-grid-col.js and v-grid-atts populate these defaults with new values
       ***************************************************************************************/
    constructor(vGrid: any);
    
    /***************************************************************************************
       *  utillity functions for setting attibutes default, and converting them
       ***************************************************************************************/
    setValue(htmlAttributeValue: any, defaultValue: any): any;
    setBindValueArray(value: any, toProperty: any): any;
    setBindValueInt(value: any, toProperty: any): any;
    setBindValueString(value: any, toProperty: any): any;
    setBindValueFunction(value: any, toProperty: any): any;
    setBindValueBool(value: any, toProperty: any): any;
    
    /***************************************************************************************
       * loops current rowRef and create tempRef that gets sent to onRowDraw
       ***************************************************************************************/
    getRowProperties(obj: any): any;
    
    /***************************************************************************************
       * calls remote function
       ***************************************************************************************/
    remoteCall(data: any): any;
    
    /***************************************************************************************
       * This is called when grid runs filter
       ***************************************************************************************/
    onFilterRun: any;
    
    /***************************************************************************************
       * grid asks for the filter name from attibute
       ***************************************************************************************/
    getFilterName(name: any): any;
    
    /***************************************************************************************
       * This just sets data from array,
       * Use {} if you want markup of columns, or undefined for total blank rows
       ***************************************************************************************/
    getDataElement(row: any, isDown: any, isLargeScroll: any, callback: any): any;
    
    /***************************************************************************************
       * This calls the order by function
       * Use {} if you want markup of columns, or undefined for total blank rows
       ***************************************************************************************/
    onOrderBy(attribute: any, add: any): any;
    
    /***************************************************************************************
       * Just for knowing length,
       * Its this you will need to add for server source/paging with endless scrolling
       ***************************************************************************************/
    getCollectionLength(): any;
    
    /***************************************************************************************
       * Listen for click on rows(called from v-grid-generator eventlistner for the buffer rows it created)
       * Snd set current entity, and also allow edit of cell
       ***************************************************************************************/
    clickHandler(event: any, row: any): any;
    
    /****************************************************************************************************************************
       * calls user for element, user haveto use callback here, might also need to fetch data first..
       ****************************************************************************************************************************/
    updateRowBinding(rowNo: any, row: any, isDownScroll: any, isLargeScroll: any): any;
  }
  
  /*****************************************************************************************************************
   *    Contextmenu
   *    Main class for attributes "context menu"
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class Contextmenu {
    constructor(element: any, vGrid: any);
    getLang(value: any): any;
    bind(bindingContext: any, overrideContext: any): any;
    attached(): any;
    detached(): any;
    canOpen(): any;
    closeIfOpen(): any;
    addListener(): any;
    removeListener(): any;
    contextListener(e: any): any;
    addMenuClickListner(): any;
    removeMenuClickListner(): any;
    clickListener(e: any): any;
    clickInsideElement(e: any, className: any): any;
    createMenu(): any;
    replaceMenu(html: any): any;
    removeMenu(): any;
    toggleMenuOn(): any;
    toggleMenuOff(): any;
    
    /**
       * Positions the menu properly.
       */
    positionMenu(e: any): any;
    
    /**
       * Get's exact position of event.
       */
    getPosition(e: any): any;
    createMenuHTML(menuArray: any): any;
  }
  
  /*****************************************************************************************************************
   *    VGridClientCtx
   *    This will contexin all functions that I expose to client side in gridcontext xxxx.ctx
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class VGridCtx {
    constructor(vGrid: any);
    
    /***************************************************************************************
       * getters/setters to make it easier
       ***************************************************************************************/
    vGridSelection: any;
    vGridConfig: any;
    vGridCellHelper: any;
    vGridElement: any;
    vGridSortable: any;
    vGridResizable: any;
    vGridFilter: any;
    vGridSort: any;
    vGridObservables: any;
    vGridGenerator: any;
    vGridCurrentEntityRef: any;
    vGridRowKey: any;
    vGridCollectionFiltered: any;
    vGridCollection: any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    setData(data: any): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    keepFilterOnCollectionChange(): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    rebuildColumns(): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    scrollBottom(): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    scrollTop(): any;
    setScrollTop(newTop: any): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    rebuildColumnsRows(): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    columnChangeAndCollection(resetScrollToTop: any): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    redrawGrid(): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    showSelectedAndNotSelected(): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    showOnlySelected(): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    showOnlyNotSelected(): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    setColumns(paramObj: any): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    getColumns(): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    getMaxRows(): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    scrollBottomNext(): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    setLoadingOverlay(value: any): any;
    
    /****************************************************************************************************************************
       * explain
       ****************************************************************************************************************************/
    getScrollTop(): any;
    
    /****************************************************************************************************************************
       * remote external call for pager
       ****************************************************************************************************************************/
    remoteGoToFirst(): any;
    remoteGoToNext(): any;
    remoteGoToPage(x: any): any;
    remoteGoToOffset(x: any): any;
    remoteGoTofirstPrev(): any;
    remoteGoTofirstLast(): any;
  }
  
  /*****************************************************************************************************************
   *    VGridCol
   *    This is just for getting the params for v-grid-col to create the grid
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class VGridElementColConfig {
    colWidth: any;
    colField: any;
    colHeaderName: any;
    colSort: any;
    colFilter: any;
    colFilterTop: any;
    colAddLabelAttributes: any;
    colAddFilterAttributes: any;
    colAddRowAttributes: any;
    colType: any;
    constructor(element: any, vGrid: any, targetInstruction: any);
    bind(bindingContext: any, overrideContext: any): any;
  }
  
  /*****************************************************************************************************************
   *    VGridFooterPager
   *    Custom element for use in the footer container
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class VGridElementFooterPager {
    info: any;
    constructor(element: any);
    bind(parent: any): any;
    attached(): any;
    getLang(value: any): any;
    updatePager(data: any): any;
    firstBtn(): any;
    nextBtn(): any;
    prevBtn(): any;
    lastBtn(): any;
  }
  
  /*****************************************************************************************************************
   *    VGridRowRepeat
   *    Custom element just repeating the heml inside it for each row
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class VGridElementRowRepeat {
    constructor(element: any, vGrid: any, targetInstruction: any);
    bind(bindingContext: any): any;
  }
  
  /*****************************************************************************************************************
   *    vGridFilter
   *    This just does the filtering on vGridCollection from the values the grid gives it
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class VGridFilter {
    
    /***************************************************************************************
       * constsructor
       ***************************************************************************************/
    constructor(vGrid: any);
    
    //not in use yet
    lastFilter: any;
    queryStrings: any;
    
    ///filter table
    filterOperatorTable: any;
    
    //end with
    //filter table
    filterOperatorTableString: any;
    
    //10
    /***************************************************************************************
       * run the name of filter
       ***************************************************************************************/
    getNameOfFilter(name: any): any;
    
    /***************************************************************************************
       * run the filter
       ***************************************************************************************/
    run(objArray: any, ObjFilter: any): any;
  }
  
  //end class
  /*****************************************************************************************************************
   *    vGridGenerator
   *    This generates all html and adds the main events
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class VGridGenerator {
    constructor(vGrid: any);
    
    /***************************************************************************************
       * getters/setters to make it easier
       ***************************************************************************************/
    vGridSelection: any;
    vGridConfig: any;
    vGridCellHelper: any;
    vGridElement: any;
    vGridResizable: any;
    vGridScrollEvents: any;
    
    /*************************************************************************************
       * internal vars
       *************************************************************************************/
    contentHeight: any;
    gridHeight: any;
    gridWidth: any;
    scrollBodyHeight: any;
    scrollBottomOnNext: any;
    
    //cache
    gridElement: any;
    headerElement: any;
    headerScrollElement: any;
    contentElement: any;
    footerElement: any;
    rowElementArray: any;
    
    //this contains top, viewslots and "div" is the html element
    contentScrollBodyElement: any;
    
    //viewPorts
    rowViewFactory: any;
    loadingScreenViewSlot: any;
    headerViewSlot: any;
    footerViewSlot: any;
    
    /****************************************************************************************************************************
       * will create the actual grid (cant be constructor since I call this when rebuilding)
       ****************************************************************************************************************************/
    init(isRebuild: any): any;
    
    /****************************************************************************************************************************
       * add the html
       ****************************************************************************************************************************/
    addHtml(): any;
    
    /****************************************************************************************************************************
       * add the events  (this is called during rebuild etc
       ****************************************************************************************************************************/
    addEvents(): any;
    
    /****************************************************************************************************************************
       * gets the main div to create grid in
       ****************************************************************************************************************************/
    createGridElement(): any;
    
    /****************************************************************************************************************************
       * add header div
       ****************************************************************************************************************************/
    createGridHeaderElement(): any;
    
    /****************************************************************************************************************************
       * add content div
       ****************************************************************************************************************************/
    createGridContentElement(): any;
    
    /****************************************************************************************************************************
       * adds the footer
       ****************************************************************************************************************************/
    createGridFooterElement(): any;
    
    /****************************************************************************************************************************
       * add the scroll body
       ****************************************************************************************************************************/
    createGridScrollBodyElement(): any;
    
    /****************************************************************************************************************************
       * add the rows to scroll div
       ****************************************************************************************************************************/
    createGridRowElements(): any;
    
    //end for loop
    /****************************************************************************************************************************
       * creates loading screen
       ****************************************************************************************************************************/
    createLoadingScreenViewSlot(): any;
    
    /****************************************************************************************************************************
       * creates the header viewslot
       ****************************************************************************************************************************/
    createHeaderViewSlot(): any;
    
    /****************************************************************************************************************************
       * creates the row viewslots
       ****************************************************************************************************************************/
    createRowViewSlots(): any;
    
    /****************************************************************************************************************************
       * creates the footer viewslots
       ****************************************************************************************************************************/
    createFooterViewSlot(): any;
    
    /****************************************************************************************************************************
       * fills data into rows (all)
       ****************************************************************************************************************************/
    rebindAllRowSlots(): any;
    
    /****************************************************************************************************************************
       * fills data into row, 1 row!
       ****************************************************************************************************************************/
    rebindRowNumber(rowno: any): any;
    
    /****************************************************************************************************************************
       * updates only selection on rows
       ****************************************************************************************************************************/
    updateSelectionOnAllRows(): any;
    
    /****************************************************************************************************************************
       * returns header template
       ****************************************************************************************************************************/
    getHeaderViewFactory(): any;
    
    /****************************************************************************************************************************
       * returns row viewFactory, if it does not exist it creates it
       ****************************************************************************************************************************/
    getRowViewFactory(): any;
    
    /****************************************************************************************************************************
       * get total column width
       ****************************************************************************************************************************/
    getTotalColumnWidth(): any;
    
    /****************************************************************************************************************************
       * gets the row cache length...
       ****************************************************************************************************************************/
    getRowCacheLength(): any;
    
    /****************************************************************************************************************************
       * set top value, here I could have failback to TOP instead of translate 3d
       ****************************************************************************************************************************/
    setRowTopValue(rowArray: any, elementNo: any, topValue: any): any;
    
    /****************************************************************************************************************************
       * rebuild header div, needed if user sets new columns or something
       ****************************************************************************************************************************/
    rebuildGridHeaderHtmlAndViewSlot(): any;
    
    /****************************************************************************************************************************
       * sets scroll body to interal variable
       ****************************************************************************************************************************/
    setScrollBodyHeightToVar(): any;
    
    /****************************************************************************************************************************
       * add the scroll body, this is needed when user chnages columns or resize the columns, so main content knows if scrollbars is needed
       ****************************************************************************************************************************/
    correctRowAndScrollbodyWidth(): any;
    
    /****************************************************************************************************************************
       *
       ****************************************************************************************************************************/
    correctHeaderAndScrollbodyWidth(): any;
    
    /****************************************************************************************************************************
       * helper, removes rows, se minus height so we cant scroll to empty
       ****************************************************************************************************************************/
    hideRowsThatIsLargerThanCollection(): any;
    
    /****************************************************************************************************************************
       * hiding scroll bars when not needed
       ****************************************************************************************************************************/
    updateGridScrollbars(): any;
    
    /****************************************************************************************************************************
       * sett large scroll limit, looks like *3 content height is a better match from lates testing
       ****************************************************************************************************************************/
    setLargeScrollLimit(): any;
    
    /****************************************************************************************************************************
       * unbind & detach the  row view slots
       ****************************************************************************************************************************/
    unbindDetachRowViewSlots(): any;
    
    /****************************************************************************************************************************
       * unbind & detach the  header view slot
       ****************************************************************************************************************************/
    unbindDetachHeaderViewSlots(): any;
    
    /****************************************************************************************************************************
       * unbind & detach the  header view slot
       ****************************************************************************************************************************/
    unbindDetachFooterViewSlots(): any;
    
    /****************************************************************************************************************************
       * unbind & detach the  header view slot
       ****************************************************************************************************************************/
    unbindDetachLoadingScreenViewSlots(): any;
    
    /****************************************************************************************************************************
       * unbind & detach all view slots
       ****************************************************************************************************************************/
    unbindDetachViewSlots(): any;
    
    /****************************************************************************************************************************
       * recreate the row view slots
       ****************************************************************************************************************************/
    recreateRowViewSlots(): any;
    
    /****************************************************************************************************************************
       * redraws most parts of grid...
       ****************************************************************************************************************************/
    redrawGrid(): any;
    
    /****************************************************************************************************************************
       * fixes header body width
       ****************************************************************************************************************************/
    fixHeaderWithBody(): any;
    
    /****************************************************************************************************************************
       * rebuilds columns incl header row, used by internal, but can also be called from outside
       ****************************************************************************************************************************/
    rebuildColumns(): any;
    
    /****************************************************************************************************************************
       * rebuilds columns (not header), used by internal, but can also be called from outside
       ****************************************************************************************************************************/
    rebuildColumnsRows(): any;
    
    /****************************************************************************************************************************
       * rebuilds columns and trigger collection change in grid (rebuild rows), used by internal, but can also be called from outside
       ****************************************************************************************************************************/
    columnChangeAndCollection(resetScrollToTop: any): any;
    
    /****************************************************************************************************************************
       * trigger collection change in grid (rebuild rows), used by internal, but can also be called from outside
       ****************************************************************************************************************************/
    collectionChange(resetScrollToTop: any, scrollBottom: any): any;
  }
  
  /*****************************************************************************************************************
   *    VGridMarkupGenerator
   *    This generates all html strings needed for row/headers templates when needed
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class VGridMarkupGenerator {
    constructor(vGrid: any);
    
    /********************************************************************
       * checks the column configs and calls method to process them
       ********************************************************************/
    generate(): any;
    
    /********************************************************************
       * loops the column and starts calling functions to generaate the markup
       ********************************************************************/
    processColumns(array: any): any;
    
    /********************************************************************
       * generates and sets the header template
       ********************************************************************/
    createHeaderTemplate(col: any): any;
    
    /********************************************************************
       * generates and sets the row template
       ********************************************************************/
    createRowTemplate(col: any): any;
    
    /********************************************************************
       * simple way to get get attribute, this can prb be done better...
       ********************************************************************/
    getAttribute: any;
    
    /********************************************************************
       *adds rowRef if temp/rowRef isnt set, have this so user dont haveto write it to make it work
       ********************************************************************/
    checkAttribute(attribute: any): any;
    
    /********************************************************************
       * create image row markup
       ********************************************************************/
    createImageRowMarkup(col: any): any;
    
    /********************************************************************
       * create text/checkbox row markup
       ********************************************************************/
    createInputRowMarkup(col: any): any;
    
    /********************************************************************
       * create header filter markup
       ********************************************************************/
    createInputHeaderMarkup(col: any): any;
    
    /********************************************************************
       * create label markup
       ********************************************************************/
    createLabelMarkup(col: any): any;
  }
  
  /*****************************************************************************************************************
   *    VGridObservables
   *    Observers the vGridCollection/current entity for changes
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class VGridObservables {
    constructor(vGrid: any, bindingEngine: any);
    
    //my property subscriptions
    /***************************************************************************************
       * observer vGridCollection, when entire vGridCollection gets replaced
       ***************************************************************************************/
    enableObservablesCollection(): any;
    
    /***************************************************************************************
       * enable attributes observables, like vGridCollection.push/pop/slice, etc etc
       ***************************************************************************************/
    enableObservablesArray(): any;
    
    /***************************************************************************************
       * enable attributes abservables, ->vGridCollection.name etc
       ***************************************************************************************/
    enableObservablesAttributes(): any;
    
    /***************************************************************************************
       *  disable vGridCollection observables
       ***************************************************************************************/
    disableObservablesCollection(): any;
    
    //this.collectionSubscription = null;
    /***************************************************************************************
       * disable the array observables
       ***************************************************************************************/
    disableObservablesArray(): any;
    
    /***************************************************************************************
       * disable the attibutes observables
       ***************************************************************************************/
    disableObservablesAttributes(): any;
  }
  
  /*****************************************************************************************************************
   *    VGridScrollEvents
   *    This just have all the scroll functions the vGridGenerator needs
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class VGridScrollEvents {
    constructor(vGrid: any);
    vGridGenerator: any;
    vGridSelection: any;
    vGridConfig: any;
    vGridCellHelper: any;
    vGridElement: any;
    vGridSortable: any;
    vGridResizable: any;
    
    /****************************************************************************************************************************
       * option to scrollbars scrolling where we update all the time and dont use timeout
       ****************************************************************************************************************************/
    onLargeScroll(): any;
    
    /****************************************************************************************************************************
       * add the rows to scroll div (for normal scrolling when not using scrollbars)
       ****************************************************************************************************************************/
    onSmallScroll(isDownScroll: any, currentScrollTop: any): any;
    
    /****************************************************************************************************************************
       * option to scrollbars scrolling where we dont update all the time and use timeout (
       * plan was to use this with virtual scrolling with datasource using chaching to fetch data, you dont want to try and get 500 k rows in 5 sec
       ****************************************************************************************************************************/
    onScrollbarScrolling(): any;
    
    /****************************************************************************************************************************
       * fixes scrolling / top of divs
       ****************************************************************************************************************************/
    scrollEventHandler(): any;
  }
  
  /*****************************************************************************************************************
   *    vGridSelection
   *    This just inserts the strings into html templates
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class VGridSelection {
    constructor(mode: any, vGrid: any);
    triggerEvent(): any;
    setMode(mode: any): any;
    isSelected(row: any): any;
    isSelectedMain(row: any): any;
    deSelect(row: any): any;
    deSelectMain(row: any): any;
    select(row: any, addToSelection: any): any;
    selectMain(row: any, addToSelection: any): any;
    selectRange(start: any, end: any): any;
    selectAll(): any;
    deSelectAll(): any;
    selectRangeMain(start: any, end: any): any;
    reset(): any;
    getSelectedRows(): any;
    getSelectedRowsMain(): any;
    setSelectedRows(newRows: any): any;
    setSelectedRowsMain(newRows: any): any;
    
    /****************************************************************************************************************************
       * fixes highlight and select...
       ****************************************************************************************************************************/
    highlight(e: any, currentRow: any, vGridGenerator: any): any;
  }
  
  /*****************************************************************************************************************
   *    vGridInterpolate
   *    This just does the sorting with the data the grid gives it
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class VGridSort {
    
    /***************************************************************************************
       * constsructor
       ***************************************************************************************/
    constructor(vGrid: any);
    
    //what they say...
    lastSort: any;
    curSort: any;
    
    /***************************************************************************************
       * resets sort
       ***************************************************************************************/
    reset(): any;
    
    /***************************************************************************************
       * set the filter
       ***************************************************************************************/
    setFilter(sort: any, add: any): any;
    
    /***************************************************************************************
       * returns the filter
       ***************************************************************************************/
    getFilter(): any;
    
    /***************************************************************************************
       * run the sort
       ***************************************************************************************/
    run(array: any): any;
  }
  
  /*****************************************************************************************************************
   *    vGrid
   *    This is the custom aurelia element
   *    Prb doing al kinds of wrong in here, will improve as I learn more
   *    Created by vegar ringdal
   *
   ****************************************************************************************************************/
  export class VGrid {
    static inject: any;
    vGridContextObj: any;
    vGridCollection: any;
    vGridCurrentEntity: any;
    vGridColumns: any;
    attRowHeight: any;
    attHeaderHeight: any;
    attFooterHeight: any;
    attMultiSelect: any;
    attManualSelection: any;
    attLoadingThreshold: any;
    attRemoteIndex: any;
    eventOnRowDraw: any;
    eventOnRemoteCall: any;
    attHidePagerInfo: any;
    attCustomPager: any;
    attLanguage: any;
    loadingMessage: any;
    loading: any;
    constructor(element: any, bindingEngine: any, viewCompiler: any, viewSlot: any, container: any, viewResources: any, taskQueue: any);
    
    /***************************************************************************************
       * event dispatcher
       ***************************************************************************************/
    raiseEvent(name: any, data?: any): any;
    
    //sends out event that total/filtered or selection have changed
    sendCollectionEvent(): any;
    
    /***************************************************************************************
       * resets internal key on vGridCollection/internal vGridCollectionFiltered
       ***************************************************************************************/
    checkKeys(): any;
    checkKey(row: any): any;
    vGridGetRowKey(key: any): any;
    guid(): any;
    
    /***************************************************************************************
       * when view is bounded
       ***************************************************************************************/
    bind(parent: any, overrideContext: any): any;
    
    /***************************************************************************************
       * set all options
       ***************************************************************************************/
    attached(): any;
    unbind(): any;
    
    /***************************************************************************************
       * unsubscribe property and array observers
       ***************************************************************************************/
    detached(): any;
  }
}