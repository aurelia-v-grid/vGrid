import { FilterOperators } from './filterOperators';
import { ArrayFilter } from './arrayFilter';
import { ArraySort } from './arraySort';
import { ArrayGrouping } from './arrayGrouping';
import {SortObject, FilterObject, Entity} from '../interfaces';

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

  public orderBy(
    collection: Array<Entity>,
    attribute: string | SortObject,
    addToCurrentSort?: boolean
    ): {fixed: Array<Entity>, full: Array<Entity>} {


    let grouping = this.getGrouping();
    let result: {fixed: Array<Entity>, full: Array<Entity>} = {
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
      let newSort: Array<SortObject> = [];

      let count = 0;
      // loop existing
      lastSort.forEach((sort: SortObject) => {
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

  public group(array: Array<Entity>, grouping: Array<string>, keepExpanded: boolean): Array<Entity> {
    return this.arrayGrouping.group(array, grouping, keepExpanded);
  }

  public getGrouping(): Array<string> {
    return this.arrayGrouping.getGrouping();
  }

  public groupCollapse(id: string): Array<Entity> {
    return this.arrayGrouping.collapse(id);
  }

  public groupExpand(id: string): Array<Entity> {
    return this.arrayGrouping.expand(id);
  }

  public getOrderBy(): Array<SortObject> {
    return this.arraySort.getOrderBy();
  }

  public setLastSort(array: Array<SortObject>): void {
    this.arraySort.setLastSort(array);
  }

  public setOrderBy(attribute: string| SortObject, addToCurrentSort?: boolean): void {
    this.arraySort.setOrderBy(attribute, addToCurrentSort);
  }

  public runOrderbyOn(array: Array<Entity>): void {
    this.arraySort.runOrderbyOn(array);
  }

  public resetSort(): void {
    this.arraySort.reset();
  }

  public getFilterOperatorName(operator: string): string {
    return this.filterOperators.getName(operator);
  }

  public getCurrentFilter(): Array<FilterObject> {
    return this.arrayFilter.getLastFilter();
  }

  public query(array: Array<Entity>, params: Array<FilterObject>): Array<Entity> {
    return this.arrayFilter.runQueryOn(array, params);
  }

}