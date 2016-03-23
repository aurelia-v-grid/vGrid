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
    this.__sgKey = 0;
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
      this.__sgKey = 0; //reset it
      this.collection.forEach(function (row) {
        row.__sgKey = this.__sgKey;
        this.__sgKey++;
      }.bind(this));


      //reset fileter/and collection/selection. (should I have option to check is they want to set something?)
      this.vGridSort.reset();
      this.gridContext.clearHeaderFilter();
      this.gridContext.selection.reset();
      this.gridContext.collectionChange();

      //reset
      this.rowEditMode = true;
      for (var k in this.currentEntity) {
        if (this.currentEntity.hasOwnProperty(k)) {
          this.currentEntity[k] = undefined;
        }
      }
      setTimeout(function () {
        this.rowEditMode = false
      }.bind(this), 2000);
      this.currentRow = -1;

      //set array observer
      this.enableObservablesArray();


    });
    this.collectionSubscription = collectionSubscription;

  }




  getSelectionKeys (){
    var curSel = this.gridContext.selection.getSelectedRows();
    var selKeys =[];
    var collectionFiltered = this.collectionFiltered;
    curSel.forEach(function(x){
      selKeys.push(collectionFiltered[x].__sgKey)
    });
    return selKeys;
  }

  setSelectionFromkeys(selKeys){
    var newSelection =[];
    var count = 0;
    this.collectionFiltered.forEach(function(x){
      if(selKeys.indexOf(x.__sgKey) !== -1){
        newSelection.push(count);
      }
      count++;
    });
    this.gridContext.selection.setSelectedRows(newSelection);
  }



  /***************************************************************************************
   * enable attributes observables, like collection.push/pop/slice, etc etc
   ***************************************************************************************/
  enableObservablesArray() {

    let arrayObserver = this.observerLocator.getArrayObserver(this.collection);
    arrayObserver.subscribe(function (changes) {
      
      var result = changes[0];
      var colFiltered = this.collectionFiltered;
      var col = this.collection;
      var grid = this.gridContext;

      //get selection and their keys
      var selKeys = this.getSelectionKeys();

      
      //todo, improve so it loops the result set...
      //so atm there is a limit what you can do at once..
      if (result) {
        try {
          //if anyone is added, then lets add them
          if (result.addedCount > 0) {
            col.forEach(function (x) {
              if (x.__sgKey === undefined) {
                colFiltered.push(x)
              }
            }.bind(this));
          }

          //get removed ones and get rid of them
          if (result.removed.length > 0) {

            //build array of new ones
            var toRemove = [];
            result.removed.forEach(function (x) {
              toRemove.push(x.__sgKey);
            });

            //do I really need to loop them?
            colFiltered.forEach(function (x, index, object) {
              if (toRemove.indexOf(x.__sgKey) !== -1) {
                object.splice(index, 1);
                var selKey = selKeys.indexOf(x.__sgKey);
                //also remove selection key
                if(selKeys.indexOf(x.__sgKey) !== -1){
                  selKeys.splice(selKey,1)
                }
              }
            });
          }

          //set the correct selection
          this.setSelectionFromkeys(selKeys);



          //reset index
          this.__sgKey = 0;
          col.forEach(function (row) {
            row.__sgKey = this.__sgKey;
            this.__sgKey++;
          }.bind(this));
          
          
          
          
          //remove selection
         // this.gridContext.selection.reset();
          
          //update grid
          grid.collectionChange(true);
        } catch (e) {
        }
      }
    }.bind(this));
    this.subscriptionsArray = arrayObserver
  }





  /***************************************************************************************
   * enable attributes abservables, ->collection.name etc
   ***************************************************************************************/
  enableObservablesAttributes() {

    this.gridOptions.attributeArray.forEach(function (property) {
      let propertyObserver = this.observerLocator.getObserver(this.currentEntity, property)
      propertyObserver.subscribe(function (newValue, oldValue) {
        if (newValue !== oldValue) {
          if (!this.rowEditMode) {
            this.currentRowEntity[property] = newValue;
            //todo: do I want to tag it ? this way user can get what rows are changed
            this.gridContext.updateRow(this.filterRow);
          }
        }
      }.bind(this));
      this.subscriptionsAttributes.push(propertyObserver)
    }.bind(this));
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
    this.__sgKey = 0; //reset it
    this.collection.forEach(function (row) {
      row.__sgKey = this.__sgKey;
      this.__sgKey++;
    }.bind(this));

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


    /***************************************************************************************
     * Helper for setting callbacks
     ***************************************************************************************/
    let setHelperFunction = function (gridFN, userCtxFn, internalFn, externalFN) {
      //todo: needs some rebuild, this will set out the functions to the grid context if they have added the function
      //if user have set function they want to use
      if (externalFN) {
        //does it exist?
        if (this.$parent[externalFN]) {
          //it exist, lets set it as grids callback
          gridOptions[gridFN] = this.$parent[externalFN].bind(this.$parent)
        } else {
          //if it does not then tell them about it
          console.warn(externalFN + ", function is not found while setting up: " + gridFN);
          externalFN = false; //set it to false since it failed
        }
      }

      //if not external is set, but user have added it to the context
      if (userCtxFn && !externalFN) {
        gridOptions[gridFN] = FN.bind(this.$parent);
      }

      //not user context, or direct function on partent, then lets use our internal so it works
      if (!userCtxFn && !externalFN) {
        gridOptions[gridFN] = internalFn.bind(this.$parent)
      }
    }.bind(this);





    if (this.columns.length === 0) {

      //if not columns, we want to set all inside row to repeat
      //this sets row to 100%
      gridOptions.columnWidthArrayOverride = true;

      //this gets called when its building row
      gridOptions.onRowMarkupCreate = function () {
        return this.rowData.innerHTML;
      }.bind(this);

      gridOptions.attributeArray = this.element.getAttribute("attibutes-used").split(",")
    } else {
      //if row contains columns, then we need to get the data
      //array options, get then from the elements and add them to options
      gridOptions.attributeArray = [];
      gridOptions.columnWidthArray = [];
      gridOptions.headerArray = [];
      gridOptions.filterArray = [];
      gridOptions.readOnlyArray = [];

      for (var i = 0; i < this.columns.length; i++) {
        gridOptions.attributeArray.push(this.columns[i].getAttribute("attribute"));
        gridOptions.columnWidthArray.push(this.columns[i].getAttribute("col-width"));
        gridOptions.headerArray.push(this.columns[i].getAttribute("header") || "");
        gridOptions.filterArray.push(this.columns[i].getAttribute("default-filter") || "?");
        gridOptions.readOnlyArray.push(this.columns[i].getAttribute("read-only") === "true" ? this.columns[i].getAttribute("attribute") : false);
      }
    }



    /***************************************************************************************
     * Set attibutes
     * todo: add option for user not to use the html also..
     ***************************************************************************************/
    gridOptions.rowHeight = this.gridContext.rowHeight || parseInt(this.element.getAttribute("row-height")); //default = 50
    gridOptions.headerHeight = this.gridContext.headerHeight || parseInt(this.element.getAttribute("header-height")); //default = 50
    gridOptions.footerHeight = this.gridContext.footerHeight || parseInt(this.element.getAttribute("footer-height")); //default = 50
    gridOptions.isResizableHeaders = this.gridContext.isResizableHeaders || type[this.element.getAttribute("resizable-headers")]; //default = false
    gridOptions.isMultiSelect = this.gridContext.isMultiSelect || type[this.element.getAttribute("multi-select")]; //default = undefined = none
    gridOptions.isSortableHeader = this.gridContext.isSortableHeader || type[this.element.getAttribute("sortable-headers")]; //default = false
    gridOptions.requestAnimationFrame = this.gridContext.requestAnimationFrame || type[this.element.getAttribute("request-animation-frame")]; //default = true
    gridOptions.resizableHeadersAndRows = this.gridContext.resizableHeadersAndRows || type[this.element.getAttribute("resize-also-rows")]; //default = false
    gridOptions.renderOnScrollbarScroll = this.gridContext.renderOnScrollbarScroll || type[this.element.getAttribute("render-on-scrollbar-scroll")]; //default = true
    gridOptions.lockedColumns = this.gridContext.lockedColumns || parseInt(this.element.getAttribute("locked-columns")); //default = 0
    gridOptions.addFilter = this.gridContext.addFilter || type[this.element.getAttribute("header-filter")]; //default = false
    gridOptions.filterOnAtTop = this.gridContext.filterOnAtTop || type[this.element.getAttribute("header-filter-top")]; //default = false
    gridOptions.filterOnKey = this.gridContext.filterOnKey || type[this.element.getAttribute("header-filter-onkeydown")]; //default = false dont want this yet
    gridOptions.sortOnHeaderClick = this.gridContext.sortOnHeaderClick || type[this.element.getAttribute("sort-on-header-click")]; //default = false
    

    if (this.element.getAttribute("header-filter-not-to")) {
      gridOptions.doNotAddFilterTo = this.gridContext.rowHeight || this.element.getAttribute("header-filter-not-to").split(",")
    } else {
      gridOptions.doNotAddFilterTo = this.gridContext.rowHeight || [];
    }





    /***************************************************************************************
     * This is called when grid runs filter
     ***************************************************************************************/
    if (gridOptions.addFilter) {
      setHelperFunction(
        //----------------------------------------------------------------------------//
        "onFilterRun",
        //----------------------------------------------------------------------------//
        this.gridContext.onFilterRun,
        //----------------------------------------------------------------------------//
        function (filterObj) {

          //get sel keys
          var selKeys = this.getSelectionKeys();

          this.collectionFiltered = this.vGridFilter.run(this.collection, filterObj);
          this.vGridSort.run(this.collectionFiltered);
          //set selection
          this.setSelectionFromkeys(selKeys);
          this.gridContext.collectionChange(true);
          this.rowEditMode = true;
          for (var k in this.currentEntity) {
            if (this.currentEntity.hasOwnProperty(k)) {
              this.currentEntity[k] = undefined;
            }
          }
          setTimeout(function () {
            this.rowEditMode = false
          }.bind(this), 500);

        }.bind(this),
        //----------------------------------------------------------------------------//
        this.element.getAttribute("on-row-filter")
      );
    }





    /***************************************************************************************
     * grid asks for the filter name from attibute
     ***************************************************************************************/
    setHelperFunction(
      //----------------------------------------------------------------------------//
      "getFilterName",
      //----------------------------------------------------------------------------//
      this.gridContext.getFilterName,
      //----------------------------------------------------------------------------//
      function (name) {
        return this.vGridFilter.getNameOfFilter(name)
      }.bind(this),
      //----------------------------------------------------------------------------//
      this.element.getAttribute("get-filter-name")
    );





    /***************************************************************************************
     * This just sets data from array,
     * Use {} if you want markup of columns, or undefined for total blank rows
     ***************************************************************************************/
    setHelperFunction(
      "getDataElement",
      //----------------------------------------------------------------------------//
      this.gridContext.onRowClick,
      //----------------------------------------------------------------------------//
      function (row, isDown, isLargeScroll, callback) {
        callback(this.collectionFiltered[row]);
      }.bind(this),
      //----------------------------------------------------------------------------//
      this.element.getAttribute("on-row-draw-callback")
    );





    /***************************************************************************************
     * This calls the order by function
     * Use {} if you want markup of columns, or undefined for total blank rows
     ***************************************************************************************/
    setHelperFunction(
      //----------------------------------------------------------------------------//
      "onOrderBy",
      //----------------------------------------------------------------------------//
      this.gridContext.onOrderBy,
      //----------------------------------------------------------------------------//
      function (event, setheaders) {

        //get clicked
        var attribute = event.target.getAttribute("v-grid-data-attribute");

        if (this.collectionFiltered.length > 0 && attribute) {

          //set filter
          this.vGridSort.setFilter({attribute: attribute, asc: true}, event.shiftKey);
          //set headers
          setheaders(this.vGridSort.getFilter());
          //get sel keys
          var selKeys = this.getSelectionKeys();
          //run filter
          this.vGridSort.run(this.collectionFiltered);
          //update grid
          //this.gridContext.selection.reset();
          this.setSelectionFromkeys(selKeys);
          this.gridContext.collectionChange();
          this.gridContext.collectionChange();

          this.rowEditMode = true;
          for (var k in this.currentEntity) {
            if (this.currentEntity.hasOwnProperty(k)) {
              this.currentEntity[k] = undefined;
            }
          }
          setTimeout(function () {
            this.rowEditMode = false
          }.bind(this), 500);
        }
      }.bind(this),
      //----------------------------------------------------------------------------//
      this.element.getAttribute("on-order-by")
    );





    /***************************************************************************************
     * Listen for click on rows,
     * Snd set current entity, and also allow edit of cell
     ***************************************************************************************/
    setHelperFunction(
      //----------------------------------------------------------------------------//
      "clickHandler",
      //----------------------------------------------------------------------------//
      this.gridContext.onRowClick,
      //----------------------------------------------------------------------------//
      function (event, row, cellEditHelper) {

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
      }.bind(this),
      //----------------------------------------------------------------------------//
      this.element.getAttribute("on-row-click")
    );





    /***************************************************************************************
     * Just for knowing length,
     * Its this you will need to add for server source/paging with endless scrolling
     ***************************************************************************************/
    setHelperFunction(
      //----------------------------------------------------------------------------//
      "getSourceLength",
      //----------------------------------------------------------------------------//
      this.gridContext.getSourceLength,
      //----------------------------------------------------------------------------//
      function () {
        if (gridOptions.addFilter) {
          return this.collectionFiltered.length
        } else {
          return this.collection.length
        }

      }.bind(this),
      //----------------------------------------------------------------------------//
      this.element.getAttribute("get-source-length")
    );





    this.gridOptions = gridOptions;
    //set abservables
    this.enableObservablesCollection();
    this.enableObservablesArray();

    this.enableObservablesAttributes();



    /***************************************************************************************
     * create the grid with all options
     ***************************************************************************************/
    this.gridContext = new this.vGridGenerator(gridOptions, this.vGridInterpolate, this.element, this.$parent, VGridSortable);


  }


  /***************************************************************************************
   * unsubscribe property and array observers
   ***************************************************************************************/
  detached() {
    disableObservablesAttributes();
    disableObservablesCollection();
    disableObservablesArray();
  }
}
