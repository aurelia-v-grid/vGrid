/*****************************************************************************************************************
 *    vGrid
 *    This is the custom aurelia element
 *    Prb doing al kinds of wrong in here, will improve as I learn more
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {ObserverLocator, bindable, ViewCompiler, ViewSlot, Container, ViewResources, containerless} from 'aurelia-framework';
import {VGridGenerator} from './v-grid-generator';
import {VGridFilter} from './v-grid-filter';
import {VGridSort} from './v-grid-sort';
import {VGridSortable} from './v-grid-sortable';
import {VGridCellHelper} from './v-grid-cell-helper';
import {VGridObservables} from './v-grid-observables';
import {VGridConfig} from './v-grid-config';
import {VGridResizable} from './v-grid-resizable';
import {VGridSelection} from './v-grid-selection';


export class VGrid {
  static inject = [Element, ObserverLocator, ViewCompiler, ViewSlot, Container, ViewResources];
  @bindable({attribute: "v-grid-context"}) vGridContextObj;
  @bindable({attribute: "v-collection"}) vGridCollection;
  @bindable({attribute: "v-current-entity"}) vGridCurrentEntity;


  constructor(element, observerLocator, viewCompiler, viewSlot, container, viewResources, dom) {

    //<v-grid> element
    this.element = element;


    //aurelia stuff I need for creating my cells etc
    this.viewCompiler = viewCompiler;
    this.viewSlot = viewSlot;
    this.container = container;
    this.viewResources = viewResources;

    //keeps the current entity ref
    this.vGridCurrentEntityRef = null;

    //current selected row in grid, not always the same as collection when used filter/sorting
    this.vGridCurrentRow = -1;

    //key name, used for knowing what record in filtered collection belongs to main collection
    this.vGridRowKey = "__vGridKey";

    //cloned collection used internaly for everything, I never sort the original collection
    this.vGridCollectionFiltered = [];

    //skip row update, used when setting internal values to current entity from row editing, or to undefined
    this.vGridSkipNextUpdateProperty = [];

    //my classes the grid uses
    this.vGridFilter = new VGridFilter(this);
    this.vGridSort = new VGridSort(this);
    this.vGridConfig = new VGridConfig(this);
    this.vGridSelection = new VGridSelection(null, this);
    this.vGridCellHelper = new VGridCellHelper(this);
    this.vGridSortable = new VGridSortable(this);
    this.vGridResizable = new VGridResizable(this);
    this.vGridObservables = new VGridObservables(this, observerLocator);
    this.vGridGenerator = new VGridGenerator(this);

    this.key = 0;
  }


  /***************************************************************************************
   * resets internal key on vGridCollection/internal vGridCollectionFiltered
   ***************************************************************************************/

  checkKeys() {
   // let key = 0; //reset it
    this.vGridCollection.forEach((row) => {
      if(!row[this.vGridRowKey] && row !== undefined && row !== null){
        row[this.vGridRowKey]= this.key;
        this.key++;
      }
    });
  }

  checkKey(row) {
      if(!row[this.vGridRowKey] && row !== undefined && row !== null){
        row[this.vGridRowKey]= this.key;
        this.key++;
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




  /***************************************************************************************
   * when view is bounded
   ***************************************************************************************/
  bind(parent) {


    //parent
    this.$parent = parent;

    //if they havent binded a context, then lets make one.
    //that context they will be able to trigger event on the grid
    if (!this.vGridContextObj) {
      this.vGridContextObj = {};
    }

    //set it to users
    this.vGridContextObj.ctx = this.vGridGenerator;


    //lets test that they have set the mandatory config settings
    if (this.vGridCollection === undefined || this.vGridCurrentEntity === undefined) {
      if (this.vGridCollection === undefined && this.vGridCurrentEntity === undefined) {
        console.warn("currentEntity & collection not set/binded in config attribute")
      } else {
        if (this.vGridCurrentEntity === undefined) {
          console.warn("currentEntity not set/binded in config attribute")
        }
        if (this.vGridCollection === undefined) {
          console.warn("collection not set/binded in config attribute")
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


    this.vGridConfig.init();

    //create the grid html/add events etc
    this.vGridGenerator.init(false);



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
