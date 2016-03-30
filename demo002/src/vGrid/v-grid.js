/*****************************************************************************************************************
 *    vGrid
 *    This is the custom aurelia element
 *    Prb doing al kinds of wrong in here, will improve as I learn more
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {noView, processContent, ObserverLocator, customAttribute, bindable} from 'aurelia-framework';
import {VGridGenerator} from './v-grid-generator';
import {VGridFilter} from './v-grid-filter';
import {VGridSort} from './v-grid-sort';
import {VGridInterpolate} from './v-grid-interpolate';
import {VGridSortable} from './v-grid-sortable';


@noView
@processContent(false)
@customAttribute("config")
export class VGrid {
  static inject = [Element, ObserverLocator, VGridFilter, VGridSort, VGridInterpolate];
  @bindable gridContext;
  @bindable collection;
  @bindable currentEntity;


  constructor(element, observerLocator, vGridFilter, vGridSort, vGridInterpolate) {

    this.vGridFilter = vGridFilter; //helper for filtering the cloned collection
    this.vGridSort = vGridSort; //helper for sorting the columns
    this.vGridInterpolate = vGridInterpolate; //populates mustache tags
    this.observerLocator = observerLocator; //listen for event
    this.element = element; //vgrid element
    this.currentRowEntity = null; //keeps the current entity ref
    this.filterRow = -1; //current selected row in grid, not always the same as collection when used filter/soring
    this.scrollBottomNext = false; //var to know if user wants to scroll to bottom next time array abserver gets called
    this.sgkey = "sgKey" + Math.floor((Math.random() * 1000) + 1); //keyname, need to set a random here so you can have multible grid linked to same collection
    this.gridContextMissing = false; //to know if they have binded the context or not
    this.subscriptionsAttributes = []; //here I keep subscriptions to observer on attributes
    this.collectionSubscription = null; //here I keep subscriptions to observer on collection
    this.collectionFiltered = []; //cloned collection
    this.subscriptionsArray = []; //my property subscriptions
    this.rowEditMode = false; //helper for stopping endless enditing/callback on obervers, do not know how to pause them
    this.skipNextUpdateProperty = []; //skip row update, used when setting internal values to current entity from row editing, or to undefined
    this.rowData = this.element.getElementsByTagName("V-GRID-ROW")[0];
    this.columns = this.rowData.getElementsByTagName("V-GRID-COL");
  }





  /***************************************************************************************
   * obsertver collection, when entire collection gets replaced
   ***************************************************************************************/
  enableObservablesCollection() {

    let collectionSubscription = this.__observers__.collection.subscribe(this, function (x, y) {

      //disable array observer
      this.disableObservablesArray();

      //clone array
      //key will be set in both collection and internal since with slice we get a refrence
      this.collectionFiltered = this.collection.slice(0);
      this.resetKeys();


      //reset fileter/and collection/selection. (should I have option to check is they want to set something?)
      this.vGridSort.reset();
      this.gridContext.ctx.clearHeaderSortFilter();
      this.gridContext.ctx.selection.reset();
      this.gridContext.ctx.collectionChange();

      //reset

      for (var k in this.currentEntity) {
        if (this.currentEntity.hasOwnProperty(k)) {
          this.currentEntity[k] = undefined;
          this.skipNextUpdateProperty.push(k)
        }
      }

      //set array observer
      this.enableObservablesArray();


    });
    this.collectionSubscription = this.__observers__.collection;

  }





  /***************************************************************************************
   * resets internal key on collection/internal collection
   ***************************************************************************************/
  resetKeys() {
    let key = 0; //reset it
    this.collection.forEach((row) => {
      row[this.sgkey] = key;
      key++;
    });
  }




  /***************************************************************************************
   * gets the keys from the selection
   ***************************************************************************************/
  getSelectionKeys() {
    var curSel = this.gridContext.ctx.selection.getSelectedRows();
    var selKeys = [];
    var collectionFiltered = this.collectionFiltered;
    curSel.forEach((x) => {
      selKeys.push(collectionFiltered[x][this.sgkey])
    });
    return selKeys;
  }




  /***************************************************************************************
   * sets selection from keys
   ***************************************************************************************/
  setSelectionFromKeys(selKeys) {
    var newSelection = [];
    var count = 0;
    this.collectionFiltered.forEach((x) => {
      if (selKeys.indexOf(x[this.sgkey]) !== -1) {
        newSelection.push(count);
      }
      count++;
    });
    this.gridContext.ctx.selection.setSelectedRows(newSelection);
  }





  /***************************************************************************************
   * enable attributes observables, like collection.push/pop/slice, etc etc
   ***************************************************************************************/
  enableObservablesArray() {

    let arrayObserver = this.observerLocator.getArrayObserver(this.collection);
    arrayObserver.subscribe((changes) => {

      var result = changes[0];
      var colFiltered = this.collectionFiltered;
      var col = this.collection;
      var grid = this.gridContext.ctx;

      //get selection and their keys
      var selKeys = this.getSelectionKeys();


      var curKey= -1;
      if(this.currentRowEntity){
        curKey = this.currentRowEntity[this.sgkey];
      }
      var curEntityValid = true;



      //todo, improve so it loops the result set...
      //so atm there is a limit what you can do at once..
      if (result) {

           //if anyone is added, then lets add them
          if (result.addedCount > 0) {
            col.forEach((x) => {
              if (x[this.sgkey] === undefined) {
                colFiltered.push(x)
              }
            });
          }

          //get removed ones and get rid of them
          if (result.removed.length > 0) {

            //build array of new ones
            var toRemove = [];
            result.removed.forEach((x) => {
              toRemove.push(x[this.sgkey]);
            });
            //todo: check this more, to tired to be sure Im thinking right
            let i = colFiltered.length - 1;
            while (i !== -1) {

              //is current entity removed?
              if(toRemove.indexOf(curKey) !== -1){
                curEntityValid = false;
              }

              if (toRemove.indexOf(colFiltered[i][this.sgkey]) !== -1) {
                var x = colFiltered.splice(i, 1);
                var selKey = selKeys.indexOf(x[0][this.sgkey]);
                //also remove selection key
                if (selKey !== -1) {
                  selKeys.splice(selKey, 1)
                }
              }

              i--;
            }
          }

          //check current entity, remove if removed, or get key/row
          if(!curEntityValid){
            for (var k in this.currentEntity) {
              if (this.currentEntity.hasOwnProperty(k)) {
                this.currentEntity[k] = undefined;
                this.skipNextUpdateProperty.push(k);
              }
            }
          }else{
            var newRowNo = -1;
            if(curKey){
              this.collectionFiltered.forEach((x, index) => {
                if (curKey === x[this.sgkey]) {
                  newRowNo = index;
                }
              });
            }
          }

          //set the correct selection
          this.setSelectionFromKeys(selKeys);

          //reset the keys
          this.resetKeys();

          //update key on current and filterRow
          if(newRowNo > -1){
            this.currentRowEntity = this.collectionFiltered[newRowNo];
            this.currentEntity[this.sgkey] = this.currentRowEntity[this.sgkey];
            this.filterRow = newRowNo
          }

          //update grid
          grid.collectionChange(false, this.scrollBottomNext);


      }
    });
    this.subscriptionsArray = arrayObserver
  }





  /***************************************************************************************
   * enable attributes abservables, ->collection.name etc
   ***************************************************************************************/
  enableObservablesAttributes() {

    this.gridOptions.attributeArray.forEach((property) => {
      let propertyObserver = this.observerLocator.getObserver(this.currentEntity, property);
      propertyObserver.subscribe((newValue, oldValue) => {
        if (newValue !== oldValue) {
          //check if we should skip it
          if (this.skipNextUpdateProperty.indexOf(property) === -1) {
            this.currentRowEntity[property] = newValue;
            this.gridContext.ctx.updateRow(this.filterRow, true);
          } else {
            //if skipping we also need to remove it
             this.skipNextUpdateProperty.splice(this.skipNextUpdateProperty.indexOf(property), 1);
          }
        }
      });
      this.subscriptionsAttributes.push(propertyObserver)
    });
  }





  /***************************************************************************************
   * when view is bounded
   ***************************************************************************************/
  bind(parent) {

    //parent
    this.$parent = parent;

    //if they havent binded a context, then lets make one.
    //that context they will be able to trigger event on the grid
    if (!this.gridContext) {
      this.gridContext = {};
      this.gridContextMissing = true;
    }

    //clone collection and add key index, so we know it.
    this.collectionFiltered = this.collection.slice(0);

    //resets the keys
    this.resetKeys();

  }





  /***************************************************************************************
   *  disable collection observables
   ***************************************************************************************/
  disableObservablesCollection() {
    this.collectionSubscription.unsubscribe();
    this.collectionSubscription = null;
  }





  /***************************************************************************************
   * disable the array observables
   ***************************************************************************************/
  disableObservablesArray() {
    this.subscriptionsArray.unsubscribe();
    this.subscriptionsArray = null;
  }





  /***************************************************************************************
   * disable the attibutes observables
   ***************************************************************************************/
  disableObservablesAttributes() {
    for (var i = 0; i < this.subscriptionsAttributes.length; i++) {
      try {
        this.subscriptionsAttributes[i].unsubscribe()
      } catch (e) {
      }
    }
    this.subscriptionsAttributes = [];
  }





  /***************************************************************************************
   * set all options
   ***************************************************************************************/
  attached() {

    // should I have had a lot of this in created?
    let gridOptions = {};

    //mini error checking //todo improve as I add the stuff I want
    if (!this.rowData) {
      throw "error, you need to add the row for the grid to work atm"
    }
    if (this.gridContextMissing && !this.rowData) {
      throw "grid needs context under config attributes, or row element"
    }

    //hide the element user adds
    this.rowData.style.display = "none";


    /***************************************************************************************
     * Helper for setting values
     ***************************************************************************************/
    let type = {
      "true": true,
      "false": false
    };


    let setValue = (contextValue, htmlAttributeValue, defaultValue) => {
      var value = defaultValue;
      if (contextValue !== undefined && contextValue !== null) {
        value = contextValue
      } else {
        if (htmlAttributeValue !== undefined && htmlAttributeValue !== null) {
          value = htmlAttributeValue;
        }
      }
      return value;
    };




    if (this.columns.length === 0) {
      //not in use atm, this will be the mobile view part, where you can set
      //if not columns, we want to set all inside row to repeat
      //this sets row to 100%
      gridOptions.columnWidthArrayOverride = true;

      //this gets called when its building row
      gridOptions.onRowMarkupCreate = () => {
        return this.rowData.innerHTML;
      };

      gridOptions.attributeArray = this.element.getAttribute("attibutes-used").split(",")
    } else {
      //if row contains columns, then we need to get the data
      //array options, get then from the elements and add them to options
      gridOptions.attributeArray = [];
      gridOptions.columnWidthArray = [];
      gridOptions.headerArray = [];
      gridOptions.filterArray = [];
      gridOptions.readOnlyArray = [];
      gridOptions.colStyleArray = [];


      for (var i = 0; i < this.columns.length; i++) {
        gridOptions.attributeArray.push(this.columns[i].getAttribute("attribute"));
        gridOptions.columnWidthArray.push(this.columns[i].getAttribute("col-width"));
        gridOptions.headerArray.push(this.columns[i].getAttribute("header") || "");
        gridOptions.colStyleArray.push(this.columns[i].getAttribute("col-css") || "");
        gridOptions.filterArray.push(this.columns[i].getAttribute("default-filter") || "?");
        gridOptions.readOnlyArray.push(this.columns[i].getAttribute("read-only") === "true" ? this.columns[i].getAttribute("attribute") : false);
      }

      //incase user are overriding it, or just dont wanto use markup
      gridOptions.attributeArray = this.gridContext.attributeArray || gridOptions.attributeArray;
      gridOptions.columnWidthArray = this.gridContext.columnWidthArray || gridOptions.columnWidthArray;
      gridOptions.headerArray = this.gridContext.headerArray || gridOptions.headerArray;
      gridOptions.filterArray = this.gridContext.filterArray || gridOptions.filterArray;
      gridOptions.readOnlyArray = this.gridContext.readOnlyArray || gridOptions.readOnlyArray;
      gridOptions.colStyleArray = this.gridContext.colStyleArray || gridOptions.colStyleArray;
    }





    /***************************************************************************************
     * Set attibutes
     ***************************************************************************************/
    gridOptions.rowHeight = setValue(this.gridContext.rowHeight, parseInt(this.element.getAttribute("row-height")), 50);
    gridOptions.headerHeight = setValue(this.gridContext.headerHeight, parseInt(this.element.getAttribute("header-height")), 0);
    gridOptions.footerHeight = setValue(this.gridContext.footerHeight, parseInt(this.element.getAttribute("footer-height")), 0);
    gridOptions.isResizableHeaders = setValue(this.gridContext.resizableHeaders, type[this.element.getAttribute("resizable-headers")], false);
    gridOptions.isMultiSelect = setValue(this.gridContext.multiSelect, type[this.element.getAttribute("multi-select")], undefined);
    gridOptions.isSortableHeader = setValue(this.gridContext.sortableHeader, type[this.element.getAttribute("sortable-headers")], false);
    gridOptions.requestAnimationFrame = setValue(this.gridContext.requestAnimationFrame, type[this.element.getAttribute("request-animation-frame")], true);
    gridOptions.resizableHeadersAndRows = setValue(this.gridContext.resizeAlsoRows, type[this.element.getAttribute("resize-also-rows")], false);
    gridOptions.renderOnScrollbarScroll = setValue(this.gridContext.renderOnScrollbarScroll, type[this.element.getAttribute("render-on-scrollbar-scroll")], true);
    gridOptions.lockedColumns = setValue(this.gridContext.lockedColumns, parseInt(this.element.getAttribute("locked-columns")), 0);
    gridOptions.addFilter = setValue(this.gridContext.headerFilter, type[this.element.getAttribute("header-filter")], false);
    gridOptions.filterOnAtTop = setValue(this.gridContext.headerFilterTop, type[this.element.getAttribute("header-filter-top")], false);
    gridOptions.filterOnKey = setValue(this.gridContext.headerFilterOnkeydown, type[this.element.getAttribute("header-filter-onkeydown")], false);
    gridOptions.sortOnHeaderClick = setValue(this.gridContext.sortOnHeaderClick, type[this.element.getAttribute("sort-on-header-click")], false);


    if (this.element.getAttribute("header-filter-not-to")) {
      gridOptions.doNotAddFilterTo = this.element.getAttribute("header-filter-not-to").split(",")
    } else {
      if (this.gridContext.headerFilterNotTo) {
        gridOptions.doNotAddFilterTo = this.gridContext.headerFilterNotTo.split(",")
      } else {
        gridOptions.doNotAddFilterTo = [];
      }
    }





    /***************************************************************************************
     * This is called when grid runs filter
     ***************************************************************************************/
    if (gridOptions.addFilter) {
      gridOptions.onFilterRun = (filterObj) => {

        //get sel keys
        var selKeys = this.getSelectionKeys();
        var curKey= -1;
        if(this.currentRowEntity){
          curKey = this.currentRowEntity[this.sgkey];
        }

        this.collectionFiltered = this.vGridFilter.run(this.collection, filterObj);
        this.vGridSort.run(this.collectionFiltered);
        //set selection
        this.setSelectionFromKeys(selKeys);
        
        //set current row/entity in sync
        var newRowNo =-1;
        if(curKey){
          this.collectionFiltered.forEach((x, index) => {
            if (curKey === x[this.sgkey]) {
              newRowNo = index;
            }
          });
        }

        if(newRowNo > -1){
          this.currentRowEntity = this.collectionFiltered[newRowNo];
          this.currentEntity[this.sgkey] = this.currentRowEntity[this.sgkey];
          this.filterRow = newRowNo
        }

        //update grid
        this.gridContext.ctx.collectionChange(true);

      }
    }





    /***************************************************************************************
     * grid asks for the filter name from attibute
     ***************************************************************************************/

    gridOptions.getFilterName = (name) => {
      return this.vGridFilter.getNameOfFilter(name)
    };





    /***************************************************************************************
     * This just sets data from array,
     * Use {} if you want markup of columns, or undefined for total blank rows
     ***************************************************************************************/
    gridOptions.getDataElement = (row, isDown, isLargeScroll, callback) => {
      if (this.gridContext.onRowDraw) {
        //if user have added this then we call it so they can edit the row data before we display it
        this.gridContext.onRowDraw(this.collectionFiltered[row]);
        callback(this.collectionFiltered[row]);
      } else {
        callback(this.collectionFiltered[row]);
      }
    };





    /***************************************************************************************
     * This calls the order by function
     * Use {} if you want markup of columns, or undefined for total blank rows
     ***************************************************************************************/
    gridOptions.onOrderBy = (event, setheaders) => {

      //get clicked
      var attribute = event.target.getAttribute("v-grid-data-attribute");
      if (attribute === null) {
        attribute = event.target.offsetParent.getAttribute("v-grid-data-attribute");
      }

      if (this.collectionFiltered.length > 0 && attribute) {

        //set filter
        this.vGridSort.setFilter({
          attribute: attribute,
          asc: true
        }, event.shiftKey);
        //set headers
        setheaders(this.vGridSort.getFilter());
        //get sel keys
        var selKeys = this.getSelectionKeys();
        //run filter
        this.vGridSort.run(this.collectionFiltered);
        //update grid
        this.setSelectionFromKeys(selKeys);
        this.gridContext.ctx.collectionChange();

        //set new row
        this.collectionFiltered.forEach((x, index) => {
          if (this.currentEntity[this.sgkey] === x[this.sgkey]) {
            this.filterRow = index;
          }
        });

      }
    };





    /***************************************************************************************
     * Listen for click on rows,
     * Snd set current entity, and also allow edit of cell
     ***************************************************************************************/
    gridOptions.clickHandler = (event, row, cellEditHelper) => {

      let isDoubleClick = (event.type === "dblclick");
      let attribute = event.target.getAttribute("v-grid-data-attribute");
      let readonly = this.gridOptions.readOnlyArray.indexOf(attribute) ? false : true;

      //set current row of out filtered row
      this.filterRow = row;

      //get data ref
      this.currentRowEntity = this.collectionFiltered[row];

      ///loop properties and set them to current entity
      let data = this.currentRowEntity;
      for (var k in data) {
        if (data.hasOwnProperty(k)) {
          if(this.currentEntity[k] !== data[k]){
            this.currentEntity[k] = data[k];
            this.skipNextUpdateProperty.push(k)
          }
        }
      }

      if (isDoubleClick) {

        //use helper function to edit cell
        cellEditHelper(event, readonly, (obj) => {

          //called when cell looses focus, user presses enter
          //set current entity and and update row data
          this.currentRowEntity[obj.attribute] = obj.value;
          this.currentEntity[obj.attribute] = obj.value;
          this.gridContext.ctx.updateRow(this.filterRow, true);


        },(obj) => {

          //called on each key stroke
          //lock row for update row for updates
          this.skipNextUpdateProperty.push(obj.attribute);

          //set current entity and and update row data
          this.currentRowEntity[obj.attribute] = obj.value;
          this.currentEntity[obj.attribute] = obj.value;

        });

      }
    };





    /***************************************************************************************
     * Just for knowing length,
     * Its this you will need to add for server source/paging with endless scrolling
     ***************************************************************************************/
    gridOptions.getSourceLength = () => {
      if (gridOptions.addFilter) {
        return this.collectionFiltered.length;
      } else {
        return this.collection.length;
      }
    };




    //so I have ref to it for later
    this.gridOptions = gridOptions;

    //set observables
    this.enableObservablesCollection();
    this.enableObservablesArray();
    this.enableObservablesAttributes();



    /***************************************************************************************
     * create the grid with all options
     ***************************************************************************************/
    this.gridContext.ctx = new VGridGenerator(gridOptions, this.vGridInterpolate, this.element, this.$parent, VGridSortable);

    //not tested
    this.gridContext.ctx.getSelectionKeys = () => {
      //returns the row number in parent collection
      return this.getSelectionKeys();
    };

    //not tested
    this.gridContext.ctx.setSelectionFromKeys = (x) => {
      //hightlights the rows that is visable in filtered collection from the
      this.setSelectionFromKeys(x);
    };


    this.gridContext.ctx.scrollBottomNext =() => {
      this.scrollBottomNext = true;
    }



  }


  /***************************************************************************************
   * unsubscribe property and array observers
   ***************************************************************************************/
  detached() {
    this.disableObservablesAttributes();
    this.disableObservablesCollection();
    this.disableObservablesArray();
  }
}
