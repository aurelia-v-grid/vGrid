import {Controller, RowCache, BindingContext} from '../interfaces';

export class RowDataBinder {
  private element: Element;
  private controller: Controller;
  private rebindRowBinded: EventListenerOrEventListenerObject;
  private rebindAllRowsBinded: EventListenerOrEventListenerObject;

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

/*  unused for now
    private removeEventListener(): void {
    this.element.removeEventListener('avg-rebind-row', this.rebindRowBinded);
    this.element.removeEventListener('avg-rebind-all-rows', this.rebindAllRowsBinded);
  }*/

  private rebindRow(event: CustomEvent): void {
    let currentRow = event.detail.currentRow;
    let rowCache: RowCache = event.detail.rowCache;
    let downScroll = event.detail.downScroll;

    let bindingContext = rowCache.bindingContext;

    this.controller.getElement(currentRow, downScroll, (data: BindingContext) => {

      if (data.rowRef) {
        if (data.rowRef.__group) {
          rowCache.isGroup = true;
        } else {
          rowCache.isGroup = false;
        }
      }

      // todo clean up...
      let isSelected = data.selection.isSelected(rowCache.row);
      if (isSelected) {
        if (!rowCache.selected) {
          rowCache.selected = true;
          rowCache.left.classList.add('avg-selected-row');
          rowCache.main.classList.add('avg-selected-row');
          rowCache.right.classList.add('avg-selected-row');
        }
      } else {
        if (rowCache.selected) {
          rowCache.selected = false;
          rowCache.left.classList.remove('avg-selected-row');
          rowCache.main.classList.remove('avg-selected-row');
          rowCache.right.classList.remove('avg-selected-row');
        }
      }

      if (data.rowRef === undefined || data.rowRef === null) {
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
      bindingContext.rowRef = data.rowRef;

      // selection
      bindingContext.selection = data.selection;

      // is selected
      bindingContext.selected = isSelected;

      // row number
      bindingContext.row = currentRow;

    });
  }

  private rebindAllRows(event: CustomEvent): void {

    let rowCache: RowCache[] = event.detail.rowCache;
    let downScroll = event.detail.downScroll;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < rowCache.length; i++) {

      this.controller.getElement(rowCache[i].row, downScroll, (data: BindingContext) => {

        let bindingContext = rowCache[i].bindingContext;

        if (data.rowRef) {
          if (data.rowRef.__group) {
            rowCache[i].isGroup = true;
          } else {
            rowCache[i].isGroup = false;
          }
        }

        // todo clean up...
        let isSelected = data.selection.isSelected(rowCache[i].row);
        if (isSelected) {
          if (!rowCache[i].selected) {
            rowCache[i].selected = true;
            rowCache[i].left.classList.add('avg-selected-row');
            rowCache[i].main.classList.add('avg-selected-row');
            rowCache[i].right.classList.add('avg-selected-row');
          }

        } else {
          if (rowCache[i].selected) {
            rowCache[i].selected = false;
            rowCache[i].left.classList.remove('avg-selected-row');
            rowCache[i].main.classList.remove('avg-selected-row');
            rowCache[i].right.classList.remove('avg-selected-row');
          }
        }

        if (data.rowRef === undefined || data.rowRef === null) {
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

        // row ref
        bindingContext.rowRef = data.rowRef;

        // selection
        bindingContext.selection = data.selection;

        // is selected
        bindingContext.selected = isSelected;

        // row number
        bindingContext.row = rowCache[i].row;

      });

    }

  }

}
