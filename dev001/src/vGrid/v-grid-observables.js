/*****************************************************************************************************************
 *    VGridObservables
 *    This just does the filtering on collection from the values the grid gives it
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridObservables {


  constructor(vGrid) {
    this.vGrid = vGrid;
    this.subscriptionsAttributes = []; //here I keep subscriptions to observer on attributes
    this.collectionSubscription = null; //here I keep subscriptions to observer on collection
    this.subscriptionsArray = []; //my property subscriptions


  }


  /***************************************************************************************
   * obsertver collection, when entire collection gets replaced
   ***************************************************************************************/
  enableObservablesCollection() {

    let collectionSubscription = this.vGrid.__observers__.collection.subscribe(this.vGrid, (x, y) => {

      //disable array observer
      this.disableObservablesArray();

      //clone array
      //key will be set in both collection and internal since with slice we get a refrence
      this.vGrid.collectionFiltered = this.vGrid.collection.slice(0);
      this.vGrid.resetKeys();


      //reset fileter/and collection/selection. (should I have option to check is they want to set something?)
      this.vGrid.vGridSort.reset();
      this.vGrid.vGridGenerator.clearHeaderSortFilter();
      this.vGrid.vGridSelection.reset();
      this.vGrid.vGridGenerator.collectionChange();

      //reset

      for (var k in this.vGrid.currentEntity) {
        if (this.vGrid.currentEntity.hasOwnProperty(k)) {
          this.vGrid.currentEntity[k] = undefined;
          this.vGrid.skipNextUpdateProperty.push(k)
        }
      }

      //set array observer
      this.enableObservablesArray();


    });
    this.vGrid.collectionSubscription = this.vGrid.__observers__.collection;

  }





  /***************************************************************************************
   * enable attributes observables, like collection.push/pop/slice, etc etc
   ***************************************************************************************/
  enableObservablesArray() {

    let arrayObserver = this.vGrid.observerLocator.getArrayObserver(this.vGrid.collection);
    arrayObserver.subscribe((changes) => {


      var colFiltered = this.vGrid.collectionFiltered;
      var col = this.vGrid.collection;
      var grid = this.vGrid.vGridGenerator;


      var curKey = -1;
      if (this.vGrid.currentRowEntity) {
        curKey = this.vGrid.currentRowEntity[this.sgkey];
      }
      var curEntityValid = true;


      if (changes.length > 0) {

        var added = false;
        var toRemove = [];

        //loop changes
        changes.forEach((result)=> {

          //if anyone is added, then lets save that information
          if (result.addedCount > 0) {
            added = true;
          }

          //get removed ones and save them for now
          if (result.removed.length > 0) {
            //push into removed array
            result.removed.forEach((x) => {
              toRemove.push(x[this.vGrid.sgkey]);
            });
          }
        });

        if (added === true) {
          col.forEach((x) => {
            if (x[this.vGrid.sgkey] === undefined) {
              colFiltered.push(x)
            }
          });
        }


        let i = colFiltered.length - 1;
        while (i !== -1) {
          //is current entity removed?
          if (toRemove.indexOf(curKey) !== -1) {
            curEntityValid = false;
          }
          if (toRemove.indexOf(colFiltered[i][this.vGrid.sgkey]) !== -1) {
            var x = colFiltered.splice(i, 1);
          }
          i--;
        }


        var newRowNo = -1;
        //check current entity, remove if removed, or get key/row
        if (!curEntityValid) {
          for (var k in this.vGrid.currentEntity) {
            if (this.vGrid.currentEntity.hasOwnProperty(k)) {
              this.vGrid.currentEntity[k] = undefined;
              this.vGrid.skipNextUpdateProperty.push(k);
            }
          }
        } else {

          if (curKey) {
            this.vGrid.collectionFiltered.forEach((x, index) => {
              if (curKey === x[this.vGrid.sgkey]) {
                newRowNo = index;
              }
            });
          }
        }


        //reset the keys
        this.vGrid.resetKeys();

        //update key on current and filterRow
        this.filterRowDisplaying = false;
        if (newRowNo > -1) {
          this.vGrid.currentRowEntity = this.vGrid.collectionFiltered[newRowNo];
          this.vGrid.currentEntity[this.sgkey] = this.vGrid.currentRowEntity[this.vGrid.sgkey];
          this.vGrid.filterRow = newRowNo;
          this.vGrid.filterRowDisplaying = true;
        }


        //update grid
        grid.collectionChange(false, this.scrollBottomNext);
        if (this.vGrid.filterRowDisplaying) {
          this.vGrid.vGridCellEdit.setBackFocus();
        }

      }
    });
    this.subscriptionsArray = arrayObserver
  }





  /***************************************************************************************
   * enable attributes abservables, ->collection.name etc
   ***************************************************************************************/
  enableObservablesAttributes() {
    this.vGrid.vGridConfig.attributeArray.forEach((property) => {
      let propertyObserver = this.vGrid.observerLocator.getObserver(this.vGrid.currentEntity, property);
      propertyObserver.subscribe((newValue, oldValue) => {
        if (newValue !== oldValue) {
          //check if we should skip it
          if (this.vGrid.skipNextUpdateProperty.indexOf(property) === -1) {
            this.vGrid.currentRowEntity[property] = newValue;
            this.vGrid.vGridGenerator.updateRow(this.vGrid.filterRow, true);
          } else {
            //if skipping we also need to remove it
            this.vGrid.skipNextUpdateProperty.splice(this.vGrid.skipNextUpdateProperty.indexOf(property), 1);
          }
        }
      });
      this.subscriptionsAttributes.push(propertyObserver)
    });
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





}
