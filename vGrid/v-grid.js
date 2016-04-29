/*****************************************************************************************************************
 *    vGrid
 *    This is the custom aurelia element
 *    Prb doing al kinds of wrong in here, will improve as I learn more
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {ObserverLocator, bindable, ViewCompiler, ViewSlot, Container, ViewResources} from 'aurelia-framework';
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
  @bindable({attribute: "v-grid-context"}) gridContext;
  @bindable({attribute: "v-collection"}) collection;
  @bindable({attribute: "v-current-entity"}) currentEntity;


  constructor(element, observerLocator, viewCompiler, viewSlot, container, viewResources) {

    //<v-grid> element
    this.element = element;

    //aurelia stuff I need for creating my cells etc
    this.viewCompiler = viewCompiler;
    this.viewSlot = viewSlot;
    this.container = container;
    this.viewResources = viewResources;

    //keeps the current entity ref
    this.currentRowEntity = null;

    //current selected row in grid, not always the same as collection when used filter/sorting
    this.filterRow = -1;

    //key name, need to set a random here so you can have multible grid linked to same collection
    this.sgkey = "__vGrid" + Math.floor((Math.random() * 1000) + 1);

    //cloned collection used internaly for everything, I never sort the original collection
    this.collectionFiltered = [];

    //skip row update, used when setting internal values to current entity from row editing, or to undefined
    this.skipNextUpdateProperty = [];

    //my classes the grid uses
    this.vGridFilter = new VGridFilter();
    this.vGridSort = new VGridSort();
    this.vGridConfig = new VGridConfig(this);
    this.vGridSelection = new VGridSelection(null, this);
    this.vGridCellHelper = new VGridCellHelper(this);
    this.vGridSortable = new VGridSortable(this);
    this.vGridResizable = new VGridResizable(this);
    this.vGridObservables = new VGridObservables(this, observerLocator);
    this.vGridGenerator = new VGridGenerator(this);


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
   * when view is bounded
   ***************************************************************************************/
  bind(parent) {


    //parent
    this.$parent = parent;

    //if they havent binded a context, then lets make one.
    //that context they will be able to trigger event on the grid
    if (!this.gridContext) {
      this.gridContext = {};
    }

    //set it to users
    this.gridContext.ctx = this.vGridGenerator;


    //lets test that they have set the mandatory config settings
    if (this.collection === undefined || this.currentEntity === undefined) {
      if (this.collection === undefined && this.currentEntity === undefined) {
        console.warn("currentEntity & collection not set/binded in config attribute")
      } else {
        if (this.currentEntity === undefined) {
          console.warn("currentEntity not set/binded in config attribute")
        }
        if (this.collection === undefined) {
          console.warn("collection not set/binded in config attribute")
        }
      }
    } else {
      //clone collection and add key index, so we know it.
      this.collectionFiltered = this.collection.slice(0);
      //resets the keys
      this.resetKeys();
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
    //this.vGridGenerator = new VGridGenerator(this.vGridConfig, this.element, VGridSortable, this.vGridSelection, this.vGridCellHelper, this);
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
