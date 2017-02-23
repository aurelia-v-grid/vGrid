import { ArrayFilter } from './arrayFilter';
import { ArraySort } from './arraySort';
import { ArrayGrouping } from './arrayGrouping';
import { SortObjectInterface, FilterObjectInterface, EntityInterface, GroupingObjInterface } from '../interfaces';

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
    collection: EntityInterface[],
    attribute: string | SortObjectInterface,
    addToCurrentSort?: boolean
  ): { fixed: EntityInterface[], full: EntityInterface[] } {

    const groupingFields = this.getGrouping().map((data: GroupingObjInterface) => data.field);
    const grouping = this.getGrouping();
    let result: { fixed: EntityInterface[], full: EntityInterface[] } = {
      fixed: null,
      full: null
    };

    if (groupingFields.length > 0) {

      // get last sort
      const lastSort = this.getOrderBy();

      // reset sort
      this.resetSort();

      // loop
      let exist = false;

      // if not adding, create new sort array
      const newSort: SortObjectInterface[] = [];

      let count = 0;
      // loop existing
      lastSort.forEach((sort: SortObjectInterface) => {
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
      const groupedArray = this.group(collection, grouping, true);
      // set result
      result = {
        fixed: groupedArray,
        full: collection
      };
    } else {
      if (!attribute) {
        // no attribute, just reset last sort...
        const lastSort = this.getOrderBy();
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
  public group(array: EntityInterface[], grouping: GroupingObjInterface[], keepExpanded: boolean): EntityInterface[] {
    return this.arrayGrouping.group(array, grouping, keepExpanded);
  }



  /**
   * returns current grouping
   *
   */
  public getGrouping(): GroupingObjInterface[] {
    return this.arrayGrouping.getGrouping();
  }



  /**
   * collapses 1 or all
   *
   */
  public groupCollapse(id: string): EntityInterface[] {
    return this.arrayGrouping.collapse(id);
  }



  /**
   * expands 1 or all
   *
   */
  public groupExpand(id: string): EntityInterface[] {
    return this.arrayGrouping.expand(id);
  }



  /**
   * return current orderby used/set
   *
   */
  public getOrderBy(): SortObjectInterface[] {
    return this.arraySort.getOrderBy();
  }



  /**
   * sets last sort used
   *
   */
  public setLastSort(array: SortObjectInterface[]): void {
      this.arraySort.setLastSort(array);
  }



  /**
   * sets new orderby that will be next time
   *
   */
  public setOrderBy(attribute: string | SortObjectInterface, addToCurrentSort?: boolean): void {
    this.arraySort.setOrderBy(attribute, addToCurrentSort);
  }



  /**
   * reuns orderby on array passed in
   *
   */
  public runOrderbyOn(array: EntityInterface[]): void {
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
  public getCurrentFilter(): FilterObjectInterface[] {
    return this.arrayFilter.getLastFilter();
  }



  /**
   * queries and returns new array
   *
   */
  public query(array: EntityInterface[], params: FilterObjectInterface[]): EntityInterface[] {
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
