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
  static inject = [Element, ObserverLocator, VGridGenerator, VGridFilter, VGridSort, VGridInterpolate];
  @bindable gridContext;
  @bindable collection;
  @bindable currentEntity;


  constructor(element, observerLocator, vGridGenerator, vGridFilter, vGridSort, vGridInterpolate) {
    this.vGridGenerator = vGridGenerator; //create the entire grid
    this.vGridFilter = vGridFilter; //helper for filtering the cloned collection
    this.vGridSort = vGridSort; //helper for sorting the columns
    this.vGridInterpolate = vGridInterpolate;
    this.observerLocator = observerLocator; //listen for event
    this.element = element;
    this.currentRow = -1;
    this.currentRowEntity = null;
    this.filterRow = -1;
    this.sgkey = "sgKey" + Math.random() * 100;
    this.gridContextMissing = false; //to know if they have binded the context or not
    this.subscriptionsAttributes = []; //here I keep subscriptions to observer on attributes
    this.collectionSubscription = null; //here I keep subscriptions to observer on collection
    this.collectionFiltered = []; //cloned collection
    this.subscriptionsArray = [];
    this.rowEditMode = false; //helper for stopping endless enditing/callback on obervers, do not know how to pause them
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
      this.resetKeys()


      //reset fileter/and collection/selection. (should I have option to check is they want to set something?)
      this.vGridSort.reset();
      this.gridContext.ctx.clearHeaderSortFilter();
      this.gridContext.ctx.selection.reset();
      this.gridContext.ctx.collectionChange();

      //reset
      this.rowEditMode = true;
      for (var k in this.currentEntity) {
        if (this.currentEntity.hasOwnProperty(k)) {
          this.currentEntity[k] = undefined;
        }
      }
      setTimeout(() => {
        this.rowEditMode = false
      }, 2000);
      this.currentRow = -1;

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


      //todo, improve so it loops the result set...
      //so atm there is a limit what you can do at once..
      if (result) {
        try {
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
            let i = colFiltered.length-1;
            while(i !== -1){
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

          //set the correct selection
          this.setSelectionFromKeys(selKeys);

          //reset the keys
          this.resetKeys();

          //update grid
          grid.collectionChange(true);

        } catch (e) {
          console.error("error, should not happend anymore")
        }
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
          if (!this.rowEditMode) {
            this.currentRowEntity[property] = newValue;
            this.gridContext.ctx.updateRow(this.filterRow);
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

    //mini error checking
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
    gridOptions.rowHeight = this.gridContext.rowHeight || parseInt(this.element.getAttribute("row-height")); //default = 50
    gridOptions.headerHeight = this.gridContext.headerHeight || parseInt(this.element.getAttribute("header-height")); //default = 50
    gridOptions.footerHeight = this.gridContext.footerHeight || parseInt(this.element.getAttribute("footer-height")); //default = 50
    gridOptions.isResizableHeaders = this.gridContext.resizableHeaders || type[this.element.getAttribute("resizable-headers")]; //default = false
    gridOptions.isMultiSelect = this.gridContext.multiSelect || type[this.element.getAttribute("multi-select")]; //default = undefined = none
    gridOptions.isSortableHeader = this.gridContext.sortableHeader || type[this.element.getAttribute("sortable-headers")]; //default = false
    gridOptions.requestAnimationFrame = this.gridContext.requestAnimationFrame || type[this.element.getAttribute("request-animation-frame")]; //default = true
    gridOptions.resizableHeadersAndRows = this.gridContext.resizeAlsoRows || type[this.element.getAttribute("resize-also-rows")]; //default = false
    gridOptions.renderOnScrollbarScroll = this.gridContext.renderOnScrollbarScroll || type[this.element.getAttribute("render-on-scrollbar-scroll")]; //default = true
    gridOptions.lockedColumns = this.gridContext.lockedColumns || parseInt(this.element.getAttribute("locked-columns")); //default = 0
    gridOptions.addFilter = this.gridContext.headerFilter || type[this.element.getAttribute("header-filter")]; //default = false
    gridOptions.filterOnAtTop = this.gridContext.headerFilterTop || type[this.element.getAttribute("header-filter-top")]; //default = false
    gridOptions.filterOnKey = this.gridContext.headerFilterOnkeydown || type[this.element.getAttribute("header-filter-onkeydown")]; //default = false dont want this yet
    gridOptions.sortOnHeaderClick = this.gridContext.sortOnHeaderClick || type[this.element.getAttribute("sort-on-header-click")]; //default = false


    if (this.element.getAttribute("header-filter-not-to")) {
      gridOptions.doNotAddFilterTo = this.gridContext.headerFilterNotTo || this.element.getAttribute("header-filter-not-to").split(",")
    } else {
      gridOptions.doNotAddFilterTo = this.gridContext.headerFilterNotTo || [];
    }





    /***************************************************************************************
     * This is called when grid runs filter
     ***************************************************************************************/
    if (gridOptions.addFilter) {
      gridOptions.onFilterRun = (filterObj) => {

        //get sel keys
        var selKeys = this.getSelectionKeys();

        this.collectionFiltered = this.vGridFilter.run(this.collection, filterObj);
        this.vGridSort.run(this.collectionFiltered);
        //set selection
        this.setSelectionFromKeys(selKeys);
        this.gridContext.ctx.collectionChange(true);
        this.rowEditMode = true;
        for (var k in this.currentEntity) {
          if (this.currentEntity.hasOwnProperty(k)) {
            this.currentEntity[k] = undefined;
          }
        }
        setTimeout(() => {
          this.rowEditMode = false
        }, 500);

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
    gridOptions.getDataElement =  (row, isDown, isLargeScroll, callback) => {
      if(this.gridContext.onRowDraw){
        //if user have added this then we call it so they can edit the row data before we display it
        this.gridContext.onRowDraw(this.collectionFiltered[row]);
        callback(this.collectionFiltered[row]);
      }else {
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
      if(attribute === null){
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
        //this.gridContext.selection.reset();
        this.setSelectionFromKeys(selKeys);
        this.gridContext.ctx.collectionChange();
        this.gridContext.ctx.collectionChange();

        this.rowEditMode = true;
        for (var k in this.currentEntity) {
          if (this.currentEntity.hasOwnProperty(k)) {
            this.currentEntity[k] = undefined;
          }
        }
        setTimeout(() => {
          this.rowEditMode = false
        }, 500);
      }
    };






    /***************************************************************************************
     * Listen for click on rows,
     * Snd set current entity, and also allow edit of cell
     ***************************************************************************************/
    gridOptions.clickHandler =  (event, row, cellEditHelper) => {

      let isDoubleClick = (event.type === "dblclick");
      let attribute = event.target.getAttribute("v-grid-data-attribute");
      let readonly = this.gridOptions.readOnlyArray.indexOf(attribute) ? false : true;

      //set current row of out filtered row
      this.filterRow = row;

      //get data ref
      this.currentRowEntity = this.collectionFiltered[row];

      //so row dont update... todo: find a way to pause the observer subscription
      this.rowEditMode = true;

      ///loop properties and set them to current entity
      let data = this.currentRowEntity;
      for (var k in data) {
        if (data.hasOwnProperty(k)) {
          this.currentEntity[k] = data[k];
        }
      }

      if (isDoubleClick) {

        //use helper function to edit cell
        cellEditHelper(event, readonly, function (obj) {

          //open row for updates
          this.rowEditMode = false;

          //set current entity and and update row data
          this.currentRowEntity[obj.attribute] = obj.value;
          this.currentEntity[obj.attribute] = obj.value;

        }.bind(this));

      } else {

        //if not double click then we open for editing after a little while
        setTimeout(function () {
          this.rowEditMode = false
        }.bind(this), 500);

      }
    };





    /***************************************************************************************
     * Just for knowing length,
     * Its this you will need to add for server source/paging with endless scrolling
     ***************************************************************************************/
    gridOptions.getSourceLength =  () =>  {
      if (gridOptions.addFilter) {
        return this.collectionFiltered.length
      } else {
        return this.collection.length
      }

    };






    this.gridOptions = gridOptions;

    //set observables
    this.enableObservablesCollection();
    this.enableObservablesArray();
    this.enableObservablesAttributes();



    /***************************************************************************************
     * create the grid with all options
     ***************************************************************************************/
    this.gridContext.ctx = new this.vGridGenerator(gridOptions, this.vGridInterpolate, this.element, this.$parent, VGridSortable);

    //helpers
    this.gridContext.ctx.getSelectionKeys = function () {
      //returns the row number in parent collection
      return this.getSelectionKeys();
    }.bind(this.$parent);


    this.gridContext.ctx.setSelectionFromKeys = function(x){
      //hightlights the rows that is visable in filtered collection from the
      this.setSelectionFromKeys(x);
    }.bind(this.$parent);



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
