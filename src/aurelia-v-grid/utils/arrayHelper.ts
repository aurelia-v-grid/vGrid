import {FilterOperators} from './filterOperators';
import {ArrayFilter} from './arrayFilter';
import {ArraySort} from './arraySort';
import {ArrayGrouping} from './arrayGrouping';


export class ArrayHelper {
  public filterOperators: FilterOperators;
  public arrayFilter: ArrayFilter;
  public arraySort: ArraySort;
  public arrayGrouping: ArrayGrouping;

  constructor() {
    this.filterOperators = new FilterOperators();
    this.arrayFilter = new ArrayFilter(this.filterOperators);
    this.arraySort = new ArraySort();
    this.arrayGrouping = new ArrayGrouping();

  }

  public orderBy(collection, attribute, addToCurrentSort) {


    let grouping = this.getGrouping();
    let result = {
      fixed: null,
      full: null
    };

    if (grouping.length > 0) {

      // get last sort
      let lastSort = this.getOrderBy();

      // reset sort
      this.resetSort();

      // loop
      let exist = false;

      // if not adding, create new sort array
      let newSort = [];

      let count = 0;
      // loop existing
      lastSort.forEach((sort) => {
        count++;
        if (grouping.indexOf(sort.attribute) !== -1 || addToCurrentSort) {
          newSort.push(sort);
          if (sort.attribute === attribute) {
            sort.asc = sort.asc === true ? false : true;
            sort.no = count;
            exist = true;
          }
        } else {
          if (sort.attribute === attribute) {
            sort.asc = sort.asc === true ? false : true;
            sort.no = count;
            exist = true;
            newSort.push(sort);
          }
        }

      });

      // set last sort
      this.setLastSort(newSort);

      // if it does not exist, then add
      if (!exist && attribute) {
        this.setOrderBy(attribute, true);
      }

      // run orderby
      this.runOrderbyOn(collection);

      // regroup
      let groupedArray = this.group(collection, grouping, true);
      // set result
      result = {
        fixed: groupedArray,
        full: collection
      };
    } else {
      if (!attribute) {
        // no attribute, just reset last sort...
        let lastSort = this.getOrderBy();
        this.resetSort();
        this.setLastSort(lastSort);
        this.runOrderbyOn(collection);
        result = {
          fixed: collection,
          full: collection
        };
      } else {
        this.setOrderBy(attribute, addToCurrentSort);
        this.runOrderbyOn(collection);
        result = {
          fixed: collection,
          full: collection
        };
      }

    }
    return result;
  }

  public group(array, grouping, keepExpanded) {
    return this.arrayGrouping.group(array, grouping, keepExpanded);
  }

  public getGrouping() {
    return this.arrayGrouping.getGrouping();
  }

  public groupCollapse(id) {
    return this.arrayGrouping.collapse(id);
  }

  public groupExpand(id) {
    return this.arrayGrouping.expand(id);
  }

  public getOrderBy() {
    return this.arraySort.getOrderBy();
  }

  public setLastSort(array) {
    this.arraySort.setLastSort(array);
  }

  public setOrderBy(attribute, addToCurrentSort) {
    this.arraySort.setOrderBy(attribute, addToCurrentSort);
  }

  public runOrderbyOn(array) {
    this.arraySort.runOrderbyOn(array);
  }

  public resetSort() {
    this.arraySort.reset();
  }

  public getFilterOperatorName(operator) {
    return this.filterOperators.getName(operator);
  }

  public getCurrentFilter() {
    return this.arrayFilter.getLastFilter();
  }

  public query(array, params) {
    return this.arrayFilter.runQueryOn(array, params);
  }

}
