// for typings only
import {Controller} from './controller';

export class RowDataBinder {
  private element: Element;
  private controller: Controller;
  private rebindRowBinded: any;
  private rebindAllRowsBinded: any;

  constructor(element: Element, controller: Controller) {
    this.element = element;
    this.controller = controller;

  }

  public init(): void {
    this.addEventListener();
  }


  private addEventListener(): void {
    this.rebindRowBinded = this.rebindRow.bind(this);
    this.rebindAllRowsBinded = this.rebindAllRows.bind(this);
    this.element.addEventListener('avg-rebind-row', this.rebindRowBinded);
    this.element.addEventListener('avg-rebind-all-rows', this.rebindAllRowsBinded);
  }

  private removeEventListener(): void {
    this.element.removeEventListener('avg-rebind-row', this.rebindRowBinded);
    this.element.removeEventListener('avg-rebind-all-rows', this.rebindAllRowsBinded);
  }


  private rebindRow(event): void {
    let currentRow = event.detail.currentRow;
    let rowCache = event.detail.rowCache;
    let downScroll = event.detail.downScroll;

    let leftViewSlot = rowCache.leftRowViewSlot;
    let mainViewSlot = rowCache.mainRowViewSlot;
    let rightViewSlot = rowCache.rightRowViewSlot;
    let groupViewSlot = rowCache.groupRowViewSlot;

    let overrideLeft = leftViewSlot.overrideContext;
    let overridemain = mainViewSlot.overrideContext;
    let overrideRight = rightViewSlot.overrideContext;
    let overrideGroup = groupViewSlot.overrideContext;

    this.controller.getElement(currentRow, downScroll, (data) => {

      if (data.rowRef) {
        if (data.rowRef.__group) {
          rowCache.main.avgGroup = true;
          rowCache.left.avgGroup = true;
          rowCache.right.avgGroup = true;
          rowCache.group.avgGroup = true;
        } else {
          rowCache.main.avgGroup = false;
          rowCache.left.avgGroup = false;
          rowCache.right.avgGroup = false;
          rowCache.group.avgGroup = false;
        }
      }

      // todo clean up...
      let isSelected = data.selection.isSelected(rowCache.row);
      if (isSelected) {
        if (!rowCache.main.avgSelected) {
          rowCache.main.avgSelected = true;
          rowCache.left.classList.add('avg-selected-row');
          rowCache.main.classList.add('avg-selected-row');
          rowCache.right.classList.add('avg-selected-row');
        }
      } else {
        if (rowCache.main.avgSelected) {
          rowCache.main.avgSelected = false;
          rowCache.left.classList.remove('avg-selected-row');
          rowCache.main.classList.remove('avg-selected-row');
          rowCache.right.classList.remove('avg-selected-row');
        }
      }

      if (data.rowRef === undefined || data.rowRef === '' || data.rowRef === null) {
        rowCache.left.style.display = 'none';
        rowCache.main.style.display = 'none';
        rowCache.right.style.display = 'none';
        rowCache.group.style.display = 'none';
      } else {
        rowCache.left.style.display = 'block';
        rowCache.main.style.display = 'block';
        rowCache.right.style.display = 'block';
        rowCache.group.style.display = 'block';
      }

      // row ref
      overrideLeft.bindingContext.rowRef = data.rowRef;
      overridemain.bindingContext.rowRef = data.rowRef;
      overrideRight.bindingContext.rowRef = data.rowRef;
      overrideGroup.bindingContext.rowRef = data.rowRef;

      // selection
      overrideLeft.bindingContext.selection = data.selection;
      overridemain.bindingContext.selection = data.selection;
      overrideRight.bindingContext.selection = data.selection;
      overrideGroup.bindingContext.selection = data.selection;

      // is selected
      overrideLeft.bindingContext.selected = isSelected;
      overridemain.bindingContext.selected = isSelected;
      overrideRight.bindingContext.selected = isSelected;
      overrideGroup.bindingContext.selected = isSelected;

      // row number
      overrideLeft.bindingContext.row = currentRow;
      overridemain.bindingContext.row = currentRow;
      overrideRight.bindingContext.row = currentRow;
      overrideGroup.bindingContext.row = currentRow;


    });


  }


  private rebindAllRows(event): void {

    let rowCache = event.detail.rowCache;
    let downScroll = event.detail.downScroll;

    for (let i = 0; i < rowCache.length; i++) {

      this.controller.getElement(rowCache[i].row, downScroll, (data) => {

        let leftViewSlot = rowCache[i].leftRowViewSlot;
        let mainViewSlot = rowCache[i].mainRowViewSlot;
        let rightViewSlot = rowCache[i].rightRowViewSlot;
        let groupViewSlot = rowCache[i].groupRowViewSlot;


        if (data.rowRef) {
          if (data.rowRef.__group) {
            rowCache[i].main.avgGroup = true;
            rowCache[i].left.avgGroup = true;
            rowCache[i].right.avgGroup = true;
            rowCache[i].group.avgGroup = true;
          } else {
            rowCache[i].main.avgGroup = false;
            rowCache[i].left.avgGroup = false;
            rowCache[i].right.avgGroup = false;
            rowCache[i].group.avgGroup = false;
          }
        }


        // todo clean up...
        let isSelected = data.selection.isSelected(rowCache[i].row);
        if (isSelected) {
          if (!rowCache[i].main.avgSelected) {
            rowCache[i].main.avgSelected = true;
            rowCache[i].left.classList.add('avg-selected-row');
            rowCache[i].main.classList.add('avg-selected-row');
            rowCache[i].right.classList.add('avg-selected-row');
          }

        } else {
          if (rowCache[i].main.avgSelected) {
            rowCache[i].main.avgSelected = false;
            rowCache[i].left.classList.remove('avg-selected-row');
            rowCache[i].main.classList.remove('avg-selected-row');
            rowCache[i].right.classList.remove('avg-selected-row');
          }
        }

        if (data.rowRef === undefined || data.rowRef === '' || data.rowRef === null) {
          rowCache[i].left.style.display = 'none';
          rowCache[i].main.style.display = 'none';
          rowCache[i].right.style.display = 'none';
          rowCache[i].group.style.display = 'none';
        } else {
          rowCache[i].left.style.display = 'block';
          rowCache[i].main.style.display = 'block';
          rowCache[i].right.style.display = 'block';
          rowCache[i].group.style.display = 'block';
        }

        let overrideLeft = leftViewSlot.overrideContext;
        let overridemain = mainViewSlot.overrideContext;
        let overrideRight = rightViewSlot.overrideContext;
        let overrideGroup = groupViewSlot.overrideContext;

        // rowref
        overrideLeft.bindingContext.rowRef = data.rowRef;
        overridemain.bindingContext.rowRef = data.rowRef;
        overrideRight.bindingContext.rowRef = data.rowRef;
        overrideGroup.bindingContext.rowRef = data.rowRef;

        // selection
        overrideLeft.bindingContext.selection = data.selection;
        overridemain.bindingContext.selection = data.selection;
        overrideRight.bindingContext.selection = data.selection;
        overrideGroup.bindingContext.selection = data.selection;

        // is selected
        overrideLeft.bindingContext.selected = isSelected;
        overridemain.bindingContext.selected = isSelected;
        overrideRight.bindingContext.selected = isSelected;
        overrideGroup.bindingContext.selected = isSelected;

        // row noumber
        overrideLeft.bindingContext.row = rowCache[i].row;
        overridemain.bindingContext.row = rowCache[i].row;
        overrideRight.bindingContext.row = rowCache[i].row;
        overrideGroup.bindingContext.row = rowCache[i].row;

      });

    }

  }

}
