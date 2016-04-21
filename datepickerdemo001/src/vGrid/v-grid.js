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
import {VGridCellEdit} from './v-grid-cell-edit';
import {VGridObservables} from './v-grid-observables';
import {VGridConfig} from './v-grid-config';
import {VGridSelection} from './v-grid-selection';



@noView
@processContent(false)
@customAttribute("config")
export class VGrid {
  static inject = [Element, ObserverLocator, VGridFilter, VGridSort];
  @bindable gridContext;
  @bindable collection;
  @bindable currentEntity;



  constructor(element, observerLocator, vGridFilter) {

    this.vGridFilter = vGridFilter; //helper for filtering the cloned collection
    this.vGridSort = new VGridSort(); //helper for sorting the columns
    this.vGridInterpolate = new VGridInterpolate(); //populates mustache tags
    this.observerLocator = observerLocator; //listen for event
    this.gridContext = null;
    this.element = element; //vgrid element
    this.currentRowEntity = null; //keeps the current entity ref
    this.filterRow = -1; //current selected row in grid, not always the same as collection when used filter/soring
    this.scrollBottomNext = false; //var to know if user wants to scroll to bottom next time array abserver gets called
    this.sgkey = "__vGrid" + Math.floor((Math.random() * 1000) + 1); //keyname, need to set a random here so you can have multible grid linked to same collection
    this.gridContextMissing = false; //to know if they have binded the context or not
    this.collectionFiltered = []; //cloned collection
    this.skipNextUpdateProperty = []; //skip row update, used when setting internal values to current entity from row editing, or to undefined
    this.filterRowDisplaying = true;
    this.vGridSelection = new VGridSelection(null, this);
    this.vGridCellEdit = new VGridCellEdit(this);

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
      this.gridContextMissing = true;
    }



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

    this.vGridConfig = new VGridConfig(this);
    this.vGridObservables = new VGridObservables(this);

    //set observables
    this.vGridObservables.enableObservablesCollection();
    this.vGridObservables.enableObservablesArray();
    this.vGridObservables.enableObservablesAttributes();


    //create the grid html/add events etc
    this.vGridGenerator = new VGridGenerator(this.vGridConfig, this.vGridInterpolate, this.element, VGridSortable, this.vGridSelection, this.vGridCellEdit);


    //some helper function;
    //returns the rows in main collection that is in the grid/filtered or not..
    this.vGridGenerator.getGridRows = () => {
      var array = [];
      this.collectionFiltered.forEach((x)=> {
        array.push(x[this.sgkey]);
      });
      return array;

    };


    this.vGridGenerator.scrollBottomNext = () => {
      this.scrollBottomNext = true;
    };

    this.vGridGenerator.selection = this.vGridSelection;

    this.vGridGenerator.createReport = (skipArray) => {

      //dont thouch this;
      if (skipArray === undefined) {
        skipArray = [];
      }
      var content = '';
      var rows = this.vGridGenerator.getGridRows();
      var attributes = this.vGridConfig.attributeArray;

      //sets data to our content
      var setData = (arr) => {
        content = content + arr.join(';') + '\n';
      };

      //set headers
      setData(attributes);

      //loop rows/columns
      rows.forEach((row)=> {
        let tempArr = [];
        attributes.forEach((att)=> {
          if (skipArray.indexOf(att) === -1) {
            tempArr.push(this.collection[row][att]);
          }
        });
        setData(tempArr);
      });


      //download
      var dummyElement = document.createElement('a');
      dummyElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
      dummyElement.setAttribute('download', 'contacts.csv');
      dummyElement.style.display = 'none';
      document.body.appendChild(dummyElement);
      dummyElement.click();
      document.body.removeChild(dummyElement);
    }





    //set it to users
    this.gridContext.ctx = this.vGridGenerator;



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
