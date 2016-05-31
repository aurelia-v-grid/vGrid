/*****************************************************************************************************************
 *    vGrid
 *    This is the custom aurelia element
 *    Prb doing al kinds of wrong in here, will improve as I learn more
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {TaskQueue, BindingEngine, bindable, ViewCompiler, ViewSlot, Container, ViewResources, containerless} from 'aurelia-framework';


import {VGridGenerator} from './v-grid-generator';
import {VGridFilter} from './v-grid-filter';
import {VGridSort} from './v-grid-sort';
import {VGridSortable} from './v-grid-sortable';
import {VGridObservables} from './v-grid-observables';
import {VGridConfig} from './v-grid-config';
import {VGridResizable} from './v-grid-resizable';
import {VGridSelection} from './v-grid-selection';
import {VGridCtx} from './v-grid-ctx';
import {bindableVGrid} from './v-grid-sort';
import {VGridScrollEvents} from './v-grid-scroll-events';


export class VGrid {
  static inject = [Element, BindingEngine, ViewCompiler, ViewSlot, Container, ViewResources, TaskQueue];
  @bindable({attribute: "v-grid-context"}) vGridContextObj;
  @bindable({attribute: "v-collection"}) vGridCollection;
  @bindable({attribute: "v-current-entity"}) vGridCurrentEntity;




  //loading screen when filtering/sorting
  @bindable loadingMessage = "Working please wait";
  loading = false;



  constructor(element, bindingEngine, viewCompiler, viewSlot, container, viewResources, taskQueue) {

    //<v-grid> element
    this.element = element;


    //aurelia stuff I need for creating my cells etc
    this.viewCompiler = viewCompiler;
    this.viewSlot = viewSlot;
    this.container = container;
    this.viewResources = viewResources;
    this.taskQueue = taskQueue;

    //keeps the current entity ref
    this.vGridCurrentEntityRef = null;

    //current selected row in grid, not always the same as collection when used filter/sorting
    this.vGridCurrentRow = -1;

    //key name, used for knowing what record in filtered collection belongs to main collection
    this.vGridRowKey = "__vGridKey";

    //cloned collection used internaly for everything, I never sort the original collection
    this.vGridCollectionFiltered = [];


    //my classes the grid uses
    this.vGridScrollEvents = new VGridScrollEvents(this);
    this.vGridFilter = new VGridFilter(this);
    this.vGridSort = new VGridSort(this);
    this.vGridConfig = new VGridConfig(this);
    this.vGridSelection = new VGridSelection(null, this);
    this.vGridSortable = new VGridSortable(this);
    this.vGridResizable = new VGridResizable(this);
    this.vGridObservables = new VGridObservables(this, bindingEngine);
    this.vGridGenerator = new VGridGenerator(this);
    this.vGridClientCtx = new VGridCtx(this);
    this.vGridPager = null; //set by pager




  }

  /***************************************************************************************
   * event dispatcher
   ***************************************************************************************/

  raiseEvent(name, data = {}) {
    let event = new CustomEvent(name, {
      detail: data,
      bubbles: true
    });
    this.element.dispatchEvent(event);

    return event;
  }


  /***************************************************************************************
   * resets internal key on vGridCollection/internal vGridCollectionFiltered
   ***************************************************************************************/

  checkKeys() {
   // let key = 0; //reset it
    this.vGridCollection.forEach((row) => {
      if(!row[this.vGridRowKey] && row !== undefined && row !== null){
        row[this.vGridRowKey]= this.guid();
      }
    });
  }

  checkKey(row) {
      if(!row[this.vGridRowKey] && row !== undefined && row !== null){
        row[this.vGridRowKey]= this.guid();
      }
  }

  vGridGetRowKey(key){
    var rowFound = null;
    this.vGridCollection.forEach((row, index) => {
      if(row[this.vGridRowKey] === key){
        rowFound = index;
      }
    });
    return rowFound
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }



  /***************************************************************************************
   * when view is bounded
   ***************************************************************************************/
  bind(parent, overrideContext) {


    //parent
    this.$parent = parent;
    this.overrideContext = overrideContext;

    //if they havent binded a context, then lets make one.
    //that context they will be able to trigger event on the grid
    if (!this.vGridContextObj) {
      this.vGridContextObj = {};
    }

    //set it to users
    this.vGridContextObj.ctx = this.vGridClientCtx;


    //lets test that they have set the mandatory config settings
    if (this.vGridCollection === undefined || this.vGridCurrentEntity === undefined) {
      if (this.vGridCollection === undefined && this.vGridCurrentEntity === undefined) {
        console.warn("currentEntity & collection not set/binded in config attribute");
      } else {
        if (this.vGridCurrentEntity === undefined) {
          console.warn("currentEntity not set/binded in config attribute");
        }
        if (this.vGridCollection === undefined) {
          console.warn("collection not set/binded in config attribute");
        }
      }
    } else {
      //clone collection and add key index, so we know it.
      this.vGridCollectionFiltered = this.vGridCollection.slice(0);
      //resets the keys
      this.checkKeys();
    }
  }


  /***************************************************************************************
   * set all options
   ***************************************************************************************/
  attached() {

    //set observables
    this.vGridObservables.enableObservablesCollection();
    this.vGridObservables.enableObservablesArray();
    this.vGridObservables.enableObservablesAttributes();

    //create the grid html/add events etc
    this.vGridGenerator.init(false);

  }


  unbind(){
    this.vGridGenerator.unbindDetachViewSlots();
  }


  /***************************************************************************************
   * unsubscribe property and array observers
   ***************************************************************************************/
  detached() {
    this.vGridObservables.disableObservablesAttributes();
    this.vGridObservables.disableObservablesCollection();
    this.vGridObservables.disableObservablesArray();
  }
}
