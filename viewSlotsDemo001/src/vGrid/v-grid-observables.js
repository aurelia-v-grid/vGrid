/*****************************************************************************************************************
 *    VGridObservables
 *    Observers the vGridCollection/current entity for changes
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridObservables {


  constructor(vGrid, observerLocator) {
    this.observerLocator = observerLocator;
    this.vGrid = vGrid;
    this.subscriptionsAttributes = []; //here I keep subscriptions to observer on attributes
    this.collectionSubscription = null; //here I keep subscriptions to observer on collection
    this.subscriptionsArray = []; //my property subscriptions
  }


  /***************************************************************************************
   * obsertver vGridCollection, when entire vGridCollection gets replaced
   ***************************************************************************************/
  enableObservablesCollection() {

    let collectionSubscription = this.vGrid.__observers__.vGridCollection.subscribe(this.vGrid, (x, y) => {

      //disable array observer
      this.disableObservablesArray();

      //clone array
      //key will be set in both collection and internal since with slice we get a refrence
      this.vGrid.vGridCollectionFiltered = this.vGrid.vGridCollection.slice(0);
      this.vGrid.resetKeys();


      //reset fileter/and collection/selection. (should I have option to check is they want to set something?)
      this.vGrid.vGridSort.reset();
      this.vGrid.vGridGenerator.clearHeaderSortFilter();
      this.vGrid.vGridSelection.reset();
      this.vGrid.vGridGenerator.collectionChange();

      //reset

      for (var k in this.vGrid.vGridCurrentEntity) {
        if (this.vGrid.vGridCurrentEntity.hasOwnProperty(k)) {
          this.vGrid.vGridCurrentEntity[k] = undefined;
          this.vGrid.vGridSkipNextUpdateProperty.push(k)
        }
      }

      //set array observer
      this.enableObservablesArray();


    });
    this.collectionSubscription = this.vGrid.__observers__.vGridCollection;

  }


  /***************************************************************************************
   * enable attributes observables, like vGridCollection.push/pop/slice, etc etc
   ***************************************************************************************/
  enableObservablesArray() {

    let arrayObserver = this.observerLocator.getArrayObserver(this.vGrid.vGridCollection);
    arrayObserver.subscribe((changes) => {


      var colFiltered = this.vGrid.vGridCollectionFiltered;
      var col = this.vGrid.vGridCollection;
      var grid = this.vGrid.vGridGenerator;


      var curKey = -1;
      if (this.vGrid.vGridCurrentEntityRef) {
        curKey = this.vGrid.vGridCurrentEntityRef[this.vGrid.vGridRowKey];
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
              toRemove.push(x[this.vGrid.vGridRowKey]);
            });
          }
        });

        if (added === true) {
          col.forEach((x) => {
            if (x[this.vGrid.vGridRowKey] === undefined) {
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
          if (toRemove.indexOf(colFiltered[i][this.vGrid.vGridRowKey]) !== -1) {
            var x = colFiltered.splice(i, 1);
          }
          i--;
        }


        var newRowNo = -1;
        //check current entity, remove if removed, or get key/row
        if (!curEntityValid) {
          for (var k in this.vGrid.vGridCurrentEntity) {
            if (this.vGrid.vGridCurrentEntity.hasOwnProperty(k)) {
              this.vGrid.vGridCurrentEntity[k] = undefined;
              this.vGrid.vGridSkipNextUpdateProperty.push(k);
            }
          }
          this.vGrid.vGridCurrentEntityRef = null;
          this.vGrid.vGridCurrentRow = -1;

        } else {

          if (curKey) {
            this.vGrid.vGridCollectionFiltered.forEach((x, index) => {
              if (curKey === x[this.vGrid.vGridRowKey]) {
                newRowNo = index;
              }
            });
          }
        }


        //reset the keys
        this.vGrid.resetKeys();

        //update key on current and filterRow
        if (newRowNo > -1) {
          this.vGrid.vGridCurrentEntityRef = this.vGrid.vGridCollectionFiltered[newRowNo];
          this.vGrid.vGridCurrentEntity[this.vGrid.vGridRowKey] = this.vGrid.vGridCurrentEntityRef[this.vGrid.vGridRowKey];
          this.vGrid.vGridCurrentRow = newRowNo;
        }

        //update grid
        grid.collectionChange(false);


      }
    });
    this.subscriptionsArray = arrayObserver
  }


  /***************************************************************************************
   * enable attributes abservables, ->vGridCollection.name etc
   ***************************************************************************************/
  enableObservablesAttributes() {
    this.vGrid.vGridConfig.attributeArray.forEach((property) => {
      let propertyObserver = this.observerLocator.getObserver(this.vGrid.vGridCurrentEntity, property);
      propertyObserver.subscribe((newValue, oldValue) => {

        //should I do the value formatting on the currentEntity also?
        var newValueCheck = newValue ? newValue.toString():newValue;
        var oldValueCheck = oldValue ? oldValue.toString():oldValue;

        if (newValueCheck !== oldValueCheck) {
          //check if we should skip it
          if (this.vGrid.vGridSkipNextUpdateProperty.indexOf(property) === -1 && this.vGrid.vGridCurrentEntityRef) {
            this.vGrid.vGridCurrentEntityRef[property] = newValue;
            this.vGrid.vGridGenerator.updateRow(this.vGrid.vGridCurrentRow, true);
          } else {
            //if skipping we also need to remove it
            this.vGrid.vGridSkipNextUpdateProperty.splice(this.vGrid.vGridSkipNextUpdateProperty.indexOf(property), 1);
          }
        }
      });
      this.subscriptionsAttributes.push(propertyObserver)
    });
  }


  /***************************************************************************************
   *  disable vGridCollection observables
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
