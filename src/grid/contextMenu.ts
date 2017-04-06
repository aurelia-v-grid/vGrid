// tslint:disable:max-line-length
import { ViewSlot } from 'aurelia-framework';
import { ViewCompiler, Container, ViewResources, ViewSlots, OverrideContextInterface, Controller } from '../interfaces';

/**
 * Creates the context menus used in the grid
 *
 */
export class ContextMenu {
    public show: boolean;
    private viewCompiler: ViewCompiler;
    private container: Container;
    private viewResources: ViewResources;
    private viewSlots: ViewSlots;
    private overrideContext: OverrideContextInterface;
    private top: number;
    private left: number;
    private pinnedMenu: boolean;
    private hideshow:boolean;
    private sortMenu: boolean;
    private optionsMenu: boolean;
    private filterMainMenu: boolean;
    private filterOptionsMenu: boolean;
    private columnOptionsMenu: boolean;
    private groupbyMenu: boolean;
    private callback: Function;
    private columnsHidden: any[];
    private closeMenuEventBinded: any;
    private controller: Controller;
    private menuStrings: any = {
        close: 'Close',
        pinLeft: 'Pin left',
        pinRight: 'Pin Right',
        groupBy: 'Group By',
        sortAscending: 'Sort Ascending',
        sortDescending: 'Sort Descending',
        showAll: 'Show All',
        hide: 'hide',
        clearCurrent: 'Clear Current',
        clearAll: 'Clear All',
        chooseOperator: 'Choose Operator',
        back: 'Back',
        equals: 'Equals',
        lessThanOrEqual: 'Less than or equal',
        greaterThanOrEqual: 'Greater than or equal',
        lessThan: 'Less than',
        greaterThan: 'Greater than',
        contains: 'Contains',
        notEqualTo: 'Not equal to',
        doesNotContain: 'Does not contain',
        beginsWith: 'Begins with',
        endsWith: 'Ends with',
        columnChooser: 'Column Chooser'
    };



    constructor(viewCompiler: ViewCompiler, container: Container, viewResources: ViewResources, viewSlots: ViewSlots, controller: Controller) {
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.viewSlots = viewSlots;
        this.controller = controller;
        this.closeMenuEventBinded = this.closeMenuEvent.bind(this)
        this.controller.element.addEventListener('avg-close-menu', this.closeMenuEventBinded);
    }



    /**
     * todo description
     *
     */
    public setDefaults(): void {
        this.top = 0;
        this.left = 0;
        this.show = false;
        this.hideshow = false;
        this.pinnedMenu = false;
        this.sortMenu = false;
        this.filterMainMenu = false;
        this.filterOptionsMenu = false;
        this.columnsHidden = [];
    }



    /**
     * add the custom templates if any and overridecontext to use
     *
     */
    public init(customMenuTemplates: any, overrideContext: OverrideContextInterface): void {
        this.overrideContext = overrideContext;
        let viewFactory = this.viewCompiler.compile(`<template>${this.menuHtml(customMenuTemplates)}</template>`, this.viewResources);
        let view = viewFactory.create(this.container);
        let viewSlot: ViewSlot = new ViewSlot(document.body, true);
        viewSlot.add(view);
        this.viewSlots.contextMenu = viewSlot;
        viewSlot.bind(this, { bindingContext: this, parentOverrideContext: this.overrideContext });
        viewSlot.attached();
    }



    /**
     * opens the menu
     *
     */
    public openMenu(options: {
        left: number,
        top: number,
        pinned?: string,
        sort?: string,
        hideshow?: string,
        groupby?: string,
        filter?: string,
        callback?: Function
    }): void {
        this.left = options.left;
        this.top = options.top;
        this.pinnedMenu = options.pinned ? true : false;
        this.sortMenu = options.sort ? true : false;
        this.hideshow = options.hideshow ? true : false;
        this.groupbyMenu = options.groupby ? true : false;
        this.filterMainMenu = options.filter ? true : false;
        this.show = true;
        this.callback = options.callback;
    }



    /**
     * menu click event
     *
     */
    public menuClick(type: string, option: string, event: Event): void {
        switch (true) {
            case type === 'filter' && option === 'options':
                this.showFilterOptions();
                break;
            case type === 'column' && option === 'options':

                this.columnsHidden = this.controller.columnBindingContext.setupmain.map((col: any, i: number) => {
                    let main = this.controller.columnBindingContext.setupmain[i].show;
                    let left = this.controller.columnBindingContext.setupleft[i].show;
                    let right = this.controller.columnBindingContext.setupright[i].show;
                    if (!main && !left && !right) {
                        return { no: i + '', title: col.colConfig.colHeaderName };
                    } else {
                        return null;
                    }
                }).filter((x) => {
                    let value = false;
                    if (x) {
                        value = true;
                    }
                    return value;
                })

                this.showColumnOptions();
                break;
            case type === 'option' && option === 'Back':
                this.hideOptions();
                break;
            case type === 'close' && option === 'true':
                this.show = false;
                this.pinnedMenu = false;
                this.sortMenu = false;
                this.optionsMenu = false;
                this.filterMainMenu = false;
                this.filterOptionsMenu = false;
                this.columnOptionsMenu = false;
                break;
            default:
                let result = this.callback(type, option, event);
                if (result) {
                    this.show = false;
                    this.pinnedMenu = false;
                    this.sortMenu = false;
                    this.optionsMenu = false;
                    this.filterMainMenu = false;
                    this.filterOptionsMenu = false;
                    this.columnOptionsMenu = false;
                }
        }
    }



    /**
     * update/translate menu strings
     *
     */
    public updateMenuStrings(key: string, text: string) {

        if (this.menuStrings[key]) {
            this.menuStrings[key] = text;
        }

    }


    private closeMenuEvent(): void {
        this.menuClick('close', 'true', null);
    }


    /**
     * active the filter menu
     *
     */
    private showFilterOptions(): void {
        this.optionsMenu = true;
        this.filterOptionsMenu = true;
    }


    /**
   * active the column chooser menu
   *
   */
    private showColumnOptions(): void {
        this.optionsMenu = true;
        this.columnOptionsMenu = true;
    }



    /**
     * hide the filter menu
     *
     */
    private hideOptions(): void {
        this.optionsMenu = false;
        this.filterOptionsMenu = false;
        this.columnOptionsMenu = false;
    }

    /*  positionMenu(x, y) {
        //not in use atm
        let clickCoordsX = this.left;
        let clickCoordsY = this.top;

        this.menuWidth = this.menu.offsetWidth + 4;
        this.menuHeight = this.menu.offsetHeight + 4;

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        if ((this.windowWidth - this.clickCoordsX) < this.menuWidth) {
          this.left = this.windowWidth - this.menuWidth + "px";
        } else {
          this.left = this.clickCoordsX + "px";
        }

        if ((this.windowHeight - this.clickCoordsY) < this.menuHeight) {
          this.top = this.windowHeight - this.menuHeight + "px";
        } else {
          this.top = this.clickCoordsY + "px";
        }
      }*/



    /**
     * get the markup (custom if any, or else the markup)
     *
     */
    private menuHtml(customMenuTemplates: any): string {

        let menuTop: string =
            `<div css="top:$au{top}px;left:$au{left}px" if.bind="show" class="avg-default avg-menu">`.replace(/\$(au{)/g, '${');

        let menuClose: string = customMenuTemplates.close ||
            `<ul if.bind="show" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('close','true')" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                      <path d="M3 4l4.3 4L3 12h1.4L8 8.7l3.5 3.3H13L8.6 8 13 4h-1.5L8 7.3 4.4 4H3z"/>
                      </svg> $au{menuStrings.close}
                </p>
                </li>
            </ul>`.replace(/\$(au{)/g, '${');

        let menuPinned: string = customMenuTemplates.pinned ||
            `<ul if.bind="pinnedMenu && !optionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('pinned','left', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"></i> $au{menuStrings.pinLeft}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('pinned','right', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"></i> $au{menuStrings.pinRight}
                </p>
                </li>
            </ul>`.replace(/\$(au{)/g, '${');

        let menuHide: string = customMenuTemplates.menuHide ||
            `<ul if.bind="hideshow && !optionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('hide','hide', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M4.8 7.5h6.5v1H4.8z"/>
                    </svg> $au{menuStrings.hide}
                </p>
                </li>
            </ul>`.replace(/\$(au{)/g, '${');

        let menuGroupby: string = customMenuTemplates.groupby ||
            `<ul if.bind="groupbyMenu && !optionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('groupby','groupby', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                     <path d="M3 4v1h10V4H3zm3.7 2.4v1H13v-1H6.8zm0 2.4v1H13v-1H6.8zm0 2.3v1H13v-1H6.8z"/>
                      </svg> $au{menuStrings.groupBy}
                </p>
                </li>
            </ul>`.replace(/\$(au{)/g, '${');

        let menuSort: string = customMenuTemplates.sort ||
            `<ul if.bind="sortMenu && !optionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('sort','asc', $event)" class="avg-menu__link">
                       <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M7.4 6L3 10h1.5L8 7l3.4 3H13L8.5 6h-1z"/>
                      </svg> $au{menuStrings.sortAscending}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('sort','desc', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M7.4 10L3 6h1.5L8 9.2 11.3 6H13l-4.5 4h-1z"/>
                    </svg> $au{menuStrings.sortDescending}
                </p>
                </li>
            </ul>`.replace(/\$(au{)/g, '${');

        let menuFilter: string = customMenuTemplates.filter ||
            `<ul if.bind="filterMainMenu && !optionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filter','showall', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M7.4 4.8v2.7H4.7v1h2.7v3h1v-3h2.8v-1H8.5V4.8h-1z"/>
                      </svg> $au{menuStrings.showAll}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filter','clear', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M4.8 7.5h6.5v1H4.8z">
                      </svg> $au{menuStrings.clearCurrent}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filter','clearall', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M4.8 7.5h6.5v1H4.8z">
                      </svg> $au{menuStrings.clearAll}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filter','options', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M7.3 4v1.2L11 7.5H3v1h8l-3.7 2.2V12L13 8.4v-.8L7.3 4z"/>
                      </svg> $au{menuStrings.chooseOperator}
                </p>
                </li>
            </ul>`.replace(/\$(au{)/g, '${');

        let menuColumnChooser: string = customMenuTemplates.columnChooser ||
            `<ul if.bind="hideshow && !optionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('column','options', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M7.4 4.8v2.7H4.7v1h2.7v3h1v-3h2.8v-1H8.5V4.8h-1z"/>
                      </svg> $au{menuStrings.columnChooser}
                </p>
                </li>
        </ul>`.replace(/\$(au{)/g, '${');

        let menuColumnChooserOptions: string = customMenuTemplates.columnChooserOptions ||
            `<ul if.bind="columnOptionsMenu" class="avg-menu__items">
             <li class="avg-menu__item">
                <p click.delegate="menuClick('option','Back', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                       <path d="M8.7 4v1.2L5 7.5h8v1H5l3.7 2.2V12L3 8.4v-1L8.7 4z"/>
                    </svg> $au{menuStrings.back}
                </p>
                </li>
                <div repeat.for="item of columnsHidden">
                    <li class="avg-menu__item">
                        <avg-drag-helper v-drag-drop-col="title:$au{item.title}" avg-type="chooser" avg-config-col="$au{item.no}">
                            <p class="avg-menu__link">
                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path show.bind="!rowRef.__groupExpanded" d="M7.4 4.8v2.7H4.7v1h2.7v3h1v-3h2.8v-1H8.5V4.8h-1z"/>
                                </svg>
                                $au{item.title}
                            </p>
                        </avg-drag-helper>
                    </li>
                </div>
            </ul>`.replace(/\$(au{)/g, '${');



        let menuFilterOptions: string = customMenuTemplates.filterOptions ||
            `<ul if.bind="filterOptionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('option','Back', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                       <path d="M8.7 4v1.2L5 7.5h8v1H5l3.7 2.2V12L3 8.4v-1L8.7 4z"/>
                      </svg> $au{menuStrings.back}
                </p>
                </li>
            </ul>
            <ul if.bind="filterOptionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','=', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M13 7H3V6h10v1zm0 3H3V9h10v1z"/>
                      </svg> $au{menuStrings.equals}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','<=', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M13 10.3L3 7.5v-.7L13 4v1L5.3 7 13 9.3v1zm0 1.7H3v-1h10v1z"/>
                      </svg> $au{menuStrings.lessThanOrEqual}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','>=', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M13 7.4L3 10.2v-1l7.7-2L3 5V4l10 2.7v.7zm0 4.5H3v-1h10v1z"/>
                      </svg> $au{menuStrings.greaterThanOrEqual}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','<', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                       <path d="M3 8.5L13 12v-1.2L5 8l8-2.7V4L3 7.7v1z"/>
                      </svg> $au{menuStrings.lessThan}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','>', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                      <path d="M13 8L3 12v-1.4l8-3-8-3.2V3l10 4v1z"/>
                      </svg> $au{menuStrings.greaterThan}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','*', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M13 9.7l-.7 1L8.6 9v3H7.4V9l-3.6 1.7-.7-1L7 8 3 6.2l.7-1 3.7 2V4h1.3v3l3.6-1.7.7 1L9 8l4 1.7z"/>
                      </svg> $au{menuStrings.contains}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','!=', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M13 9.8H7.7l-1 2.2H5.7l1-2.2H2.8v-1h4L7.5 7H3V6h5l1-2H10l-1 2H13v1H9L8 9H13v1z"/>
                      </svg> $au{menuStrings.notEqualTo}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','!*', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                       <path d="M5 4V10H4V4h1zm5.5 0v3l2-1.7.5 1L10.7 8 13 9.8l-.4 1-2-2V12h-1l.2-3-2.2 1.7-.3-1L9.5 8 7.3 6.3l.3-1L9.8 7V4h.7zM5 11v1H4v-1h1z"/>
                      </svg> $au{menuStrings.doesNotContain}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','*=', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                      <path d="M5.2 4v3l-2-1.7-.2 1L5 8 3 9.8l.3 1 2-2V12h.6l-.2-3 2 1.8.2-1L6 8l2-1.8-.3-1-2 2L6 4H5zm3 2v1.2H13v-1H8.3zm0 2.8v1H13v-1H8.3z"/>
                      </svg> $au{menuStrings.beginsWith}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','=*', $event)" class="avg-menu__link">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M10.8 4v3l2-1.8.2 1L11 8l2 1.7-.3 1-2-2V12h-.6l.2-3.2-2 2-.3-1 2-2-2-1.6.3-1 2 2L10 4h.8zm-3 2v1H3V6h4.7zm0 2.7v1H3v-1h4.7z"/>
                      </svg> $au{menuStrings.endsWith}
                </p>
                </li>
            </ul>`.replace(/\$(au{)/g, '${');

        let menuBottom = `</div>`;

        let menuAll: string = customMenuTemplates.all || [
            menuTop,
            menuClose,
            menuHide,
            menuPinned,
            menuGroupby,
            menuSort,
            menuFilter,
            menuColumnChooser,
            menuFilterOptions,
            menuColumnChooserOptions,
            menuBottom
        ].join('');

        return menuAll;

    }
}
