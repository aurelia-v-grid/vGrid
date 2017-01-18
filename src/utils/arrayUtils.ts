import { ArrayFilter } from './arrayFilter';
import { ArraySort } from './arraySort';
import { ArrayGrouping } from './arrayGrouping';
import { SortObject, FilterObject, Entity, GroupingObj } from '../interfaces';

/**
 * Helper class for calling internal sort, filter and grouping classes
 * 
 */
export class ArrayUtils {
  public arrayFilter: ArrayFilter;
  public arraySort: ArraySort;
  public arrayGrouping: ArrayGrouping;

  constructor() {
    this.arrayFilter = new ArrayFilter();
    this.arraySort = new ArraySort();
    this.arrayGrouping = new ArrayGrouping();
  }



  /**
   * orderby that also fixes grouping if set before
   * 
   */
  public orderBy(
    collection: Entity[],
    attribute: string | SortObject,
    addToCurrentSort?: boolean
  ): { fixed: Entity[], full: Entity[] } {

    let groupingFields = this.getGrouping().map((data: GroupingObj) => {return data.field; });
    let grouping = this.getGrouping();
    let result: { fixed: Entity[], full: Entity[] } = {
      fixed: null,
      full: null
    };

    if (groupingFields.length > 0) {

      // get last sort
      let lastSort = this.getOrderBy();

      // reset sort
      this.resetSort();

      // loop
      let exist = false;

      // if not adding, create new sort array
      let newSort: SortObject[] = [];

      let count = 0;
      // loop existing
      lastSort.forEach((sort: SortObject) => {
        count++;
        if (groupingFields.indexOf(sort.attribute) !== -1 || addToCurrentSort) {
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



  /**
   * calls the group class group function
   * 
   */
  public group(array: Entity[], grouping: GroupingObj[], keepExpanded: boolean): Entity[] {
    return this.arrayGrouping.group(array, grouping, keepExpanded);
  }



  /**
   * returns current grouping
   * 
   */
  public getGrouping(): GroupingObj[] {
    return this.arrayGrouping.getGrouping();
  }



  /**
   * collapses 1 or all
   * 
   */
  public groupCollapse(id: string): Entity[] {
    return this.arrayGrouping.collapse(id);
  }



  /**
   * expands 1 or all
   * 
   */
  public groupExpand(id: string): Entity[] {
    return this.arrayGrouping.expand(id);
  }



  /**
   * return current orderby used/set
   * 
   */
  public getOrderBy(): SortObject[] {
    return this.arraySort.getOrderBy();
  }



  /**
   * sets last sort used
   * 
   */
  public setLastSort(array: SortObject[]): void {
      this.arraySort.setLastSort(array);
  }



  /**
   * sets new orderby that will be next time
   * 
   */
  public setOrderBy(attribute: string | SortObject, addToCurrentSort?: boolean): void {
    this.arraySort.setOrderBy(attribute, addToCurrentSort);
  }



  /**
   * reuns orderby on array passed in
   * 
   */
  public runOrderbyOn(array: Entity[]): void {
    this.arraySort.runOrderbyOn(array);
  }



  /**
   * sesets sorting to nothing
   * 
   */
  public resetSort(defaultSortAttribute?: string): void {
    this.arraySort.reset(defaultSortAttribute);
  }



  /**
   * resets grouping
   * 
   */
  public resetGrouping(): void {
    this.arrayGrouping.reset();
  }



  /**
   * returns current filter
   * 
   */
  public getCurrentFilter(): FilterObject[] {
    return this.arrayFilter.getLastFilter();
  }



  /**
   * queries and returns new array
   * 
   */
  public query(array: Entity[], params: FilterObject[]): Entity[] {
    return this.arrayFilter.runQueryOn(array, params);
  }


  /**
   * sets local compare needed to sort language like german and norwegian
   * Needed since you might need local sorting on browser/os set to english local
   * 
   */
  public setLocaleCompare(code: string, options?: any): void {
    this.arraySort.setLocaleCompare(code, options);
  }



}
