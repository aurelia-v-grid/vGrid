import {Selection} from "./selection";
import {Collection} from './collection';
import {ArrayHelper} from './utils/arrayHelper'

export class DataSource {

  constructor(selection, config) {

    //selection
    this.selection = selection || new Selection("single");


    //overide selection get row/key from row
    //why not in selection ? because I might need rowbased selection only
    this.selection.overrideGetRowKey(this.getRowKey.bind(this));
    this.selection.overrideGetRowFromKey(this.getRowFromKey.bind(this));

    //array helper helps with grouping/sorting and filtering
    this.arrayHelper = new ArrayHelper();

    //key if you dont want grid to add
    this.key = null;

    //was thinking about tracking, had toi dump due to speed issues
    this.attributes = null;

    //main array fill contain all the data set to grid
    this.mainArray = null;

    //configuration
    this.config = config;
    if (config) {
      this.key = config.key || "__avgKey";
    } else {
      this.key = "__avgKey";
    }
    //todo, give option to override arrayhelper, or and option to set params you pass into array helper to override some of its functionality


    //events, gridConnector will add event lister to datasource set to it
    this.eventIdCount = -1;
    this.eventCallBacks = [];

    //current entity, this is what users need to link inputs etc too
    this.entity = null;

    //create a collection
    this.collection = new Collection(this);

  }


  triggerEvent(event) {
    //call all event listeners
    this.eventCallBacks.forEach((FN)=> {
      FN(event);
    })
  }


  addEventListener(callback) {

    //add key
    this.eventIdCount++;

    //add to callback queue
    this.eventCallBacks.push(callback);

    //return ID, so they can remove listnener
    return this.eventIdCount;
  }


  removeEventListener(id) {

    //remove listtener from id
    this.eventCallBacks.splice(id, 1)
  }


  getRowKey(row) {

    //if collection, then get row key
    if (this.collection) {
      return this.collection.getRowKey(row)
    } else {
      return -1;
    }

  }


  getRowFromKey(key) {

    //if collection then get row from key
    if (this.collection) {
      return this.collection.getRowFromKey(key)
    } else {
      return -1;
    }
  }


  setArray(array) {

    //new collection
    this.collection = new Collection(this);

    //todo, clear stuff set in arrayHelper or just create new?
    // ???????

    //set data to collection
    this.collection.setData(array);

    //set our main collection, we will use this for later
    this.mainArray = this.collection.getEntities();

    this.triggerEvent("collection_changed")
  }


  select(row) {
    //get row and set as current entity "entity" of datasource
    this.entity = this.collection.getRow(row);
  }


  query(options) {
    if (options) {
      //query data (using main here, so we query all data set)
      let newArray = this.arrayHelper.query(this.mainArray, options);

      //set data to our collection
      this.collection.setData(newArray);
    } else {
      this.collection.setData(this.mainArray);
    }

    //run orderby (that will fix grouping if set)
    this.orderBy(null, true);

    //trigger event so grid updates
    this.triggerEvent("collection_filtered")

  }


  orderBy(attribute, addToCurrentSort) {

    //get collection (cant use main,,, might be filtered)
    let collection = this.collection.getEntities();

    //use array helper to sort (takes care of the grouping if set)
    let result = this.arrayHelper.orderBy(collection, attribute, addToCurrentSort);

    //set data, need both incase we have grouping
    this.collection.setData(result.fixed, result.full);

    //trigger event to update grid
    this.triggerEvent("collection_sorted")

  }


  getGrouping() {
    //just return the current grouping to grid (string array)
    return this.arrayHelper.getGrouping()
  }


  getCurrentOrderBy() {
    //get
    return this.arrayHelper.getOrderBy();
  }


  getCurrentFilter() {
    return this.arrayHelper.getCurrentFilter();
  }


  getElement(row) {
    return this.collection.getRow(row);
  }


  group(grouping, keepExpanded) {
    this.arrayHelper.resetSort();
    grouping.forEach((groupName, i)=> {
      this.arrayHelper.setOrderBy(groupName, true);
    });

    this.arrayHelper.runOrderbyOn(this.collection.getEntities());
    let untouchedgrouped = this.collection.getEntities();
    let groupedArray = this.arrayHelper.group(untouchedgrouped, grouping, keepExpanded);

    this.collection.setData(groupedArray, untouchedgrouped);

    this.triggerEvent("collection_grouped")

  }


  groupCollapse(id) {
    let newArray = this.arrayHelper.groupCollapse(id);
    let oldArray = this.collection.getEntities();
    this.collection.setData(newArray, oldArray);
    if (id) {
      this.triggerEvent("collection_collapsed")
    } else {
      this.triggerEvent("collection_collapsed_all")
    }

  }


  groupExpand(id) {
    let newArray = this.arrayHelper.groupExpand(id);
    let oldArray = this.collection.getEntities();
    this.collection.setData(newArray, oldArray);
    if (id) {
      this.triggerEvent("collection_expanded")
    } else {
      this.triggerEvent("collection_expanded_all")
    }
  }


  getFilterOperatorName(operator) {
    return this.arrayHelper.getFilterOperatorName(operator);
  }


  getGrouping() {
    return this.arrayHelper.getGrouping();
  }


  addElement(data) {
    if (data) {

    } else {
      let newElement = {};
      this.mainArray.unshift(newElement);
      let oldArray = this.collection.getEntities();
      let oldMaybeGroupedArray = this.collection.entities;
      let index = oldArray.indexOf(newElement);
      if (index === -1) {
        oldArray.unshift(newElement)
      }
      oldMaybeGroupedArray.unshift(newElement);
      this.collection.setData(oldMaybeGroupedArray, oldArray);
      this.triggerEvent("collection_filtered")
    }
  }


}
