import { ViewSlot } from 'aurelia-framework';
import { ViewCompiler, Container, ViewResources, ViewSlots } from '../interfaces';


export class ContextMenu {
    public show: boolean;
    private viewCompiler: ViewCompiler;
    private container: Container;
    private viewResources: ViewResources;
    private viewSlots: ViewSlots;
    private top: number;
    private left: number;
    private pinnedMenu: boolean;
    private sortMenu: boolean;
    private filterMainMenu: boolean;
    private filterOptionsMenu: boolean;
    private groupbyMenu: boolean;
    private callback: Function;
    private menuStrings: any = {
        close: 'Close',
        pinLeft: 'Pin left',
        pinRight: 'Pin Right',
        groupBy: 'Group By',
        sortAscending: 'Sort Ascending',
        sortDescending: 'Sort Descending',
        showAll: 'Show All',
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
        endsWith: 'Ends with'
    };

    constructor(viewCompiler: ViewCompiler, container: Container, viewResources: ViewResources, viewSlots: ViewSlots) {
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.viewSlots = viewSlots;
        this.setDefaults();
    }


    public setDefaults(): void {
        this.top = 0;
        this.left = 0;
        this.show = false;
        this.pinnedMenu = false;
        this.sortMenu = false;
        this.filterMainMenu = false;
        this.filterOptionsMenu = false;
    }


    public init(customMenuTemplates: any): void {
        let viewFactory = this.viewCompiler.compile(`<template>${this.menuHtml(customMenuTemplates)}</template>`, this.viewResources);
        let view = viewFactory.create(this.container);
        let viewSlot: ViewSlot = new ViewSlot(document.body, true);
        viewSlot.add(view);
        this.viewSlots.contextMenu = viewSlot;
        viewSlot.bind(this, null);
        viewSlot.attached();
    }


    public openMenu(options: {
        left: number,
        top: number,
        pinned?: string,
        sort?: string,
        groupby?: string,
        filter?: string,
        callback?: Function
    }): void {
        this.left = options.left;
        this.top = options.top;
        this.pinnedMenu = options.pinned ? true : false;
        this.sortMenu = options.sort ? true : false;
        this.groupbyMenu = options.groupby ? true : false;
        this.filterMainMenu = options.filter ? true : false;
        this.show = true;
        this.callback = options.callback;
    }


    public menuClick(type: string, option: string, event: Event): void {
        switch (true) {
            case type === 'filter' && option === 'options':
                this.showFilterOptions();
                break;
            case type === 'filterOption' && option === 'Back':
                this.hideFilterOptions();
                break;
            case type === 'close' && option === 'true':
                this.show = false;
                break;
            default:
                let result = this.callback(type, option, event);
                if (result) {
                    this.show = false;
                    this.pinnedMenu = false;
                    this.sortMenu = false;
                    this.filterMainMenu = false;
                    this.filterOptionsMenu = false;
                }
        }
    }

    public updateMenuStrings(stringObj: any) {

        let keys: Array<string> = Object.keys(this.menuStrings);
        keys.forEach((key: string) => {
            if (stringObj[key]) {
                this.menuStrings[key] = stringObj[key];
            }
        });
    }

    private showFilterOptions(): void {
        this.filterOptionsMenu = true;
    }


    private hideFilterOptions(): void {
        this.filterOptionsMenu = false;
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




    // not the best way of doing, but easy... not very userfiendly for other languages atm
    private menuHtml(customMenuTemplates: any): string {

            let menuTop: string =
            `<nav css="top:` + '${top}px;left:${left}px' + `" if.bind="show" class="avg-default avg-menu">`

            let menuClose: string = customMenuTemplates.close ||
            `<ul if.bind="show" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('close','true')" class="avg-menu__link">
                    <i class="avg-fa avg-text"></i> ${this.menuStrings.close}
                </p>
                </li>
            </ul>`;

            let menuPinned: string = customMenuTemplates.pinned ||
            `<ul if.bind="pinnedMenu && !filterOptionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('pinned','left', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"></i> ${this.menuStrings.pinLeft}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('pinned','right', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"></i> ${this.menuStrings.pinRight}
                </p>
                </li>
            </ul>`;

            let menuGroupby: string = customMenuTemplates.groupby ||
            `<ul if.bind="groupbyMenu && !filterOptionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('groupby','groupby', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"></i> ${this.menuStrings.groupBy}
                </p>
                </li>
            </ul>`;

            let menuSort: string = customMenuTemplates.sort ||
            `<ul if.bind="sortMenu && !filterOptionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('sort','asc', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"></i> ${this.menuStrings.sortAscending}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('sort','desc', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"></i> ${this.menuStrings.sortDescending}
                </p>
                </li>
            </ul>`;

            let menuFilter: string = customMenuTemplates.filter ||
            `<ul if.bind="filterMainMenu && !filterOptionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filter','showall', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"></i> ${this.menuStrings.showAll}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filter','clear', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"></i> ${this.menuStrings.clearCurrent}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filter','clearall', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"></i> ${this.menuStrings.clearAll}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filter','options', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"></i> ${this.menuStrings.chooseOperator}
                </p>
                </li>
            </ul>`;

            let menuFilterOptions: string = customMenuTemplates.filterOptions ||
            `<ul if.bind="filterOptionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','Back', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"></i> ${this.menuStrings.back}
                </p>
                </li>
            </ul>
            <ul if.bind="filterOptionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','=', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text""></i> ${this.menuStrings.equals}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','<=', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"></i> ${this.menuStrings.lessThanOrEqual}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','>=', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text""></i> ${this.menuStrings.greaterThanOrEqual}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','<', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text""></i> ${this.menuStrings.lessThan}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','>', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text""></i> ${this.menuStrings.greaterThan}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','*', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text""></i> ${this.menuStrings.contains}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','!=', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text""></i> ${this.menuStrings.notEqualTo}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','!*', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text""></i> ${this.menuStrings.doesNotContain}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','*=', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text""></i> ${this.menuStrings.beginsWith}
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','=*', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text""></i> ${this.menuStrings.endsWith}
                </p>
                </li>
            </ul>`;

            let menuBottom: string =
            `</nav>`;

            let menuAll: string =  customMenuTemplates.all || [
                menuTop,
                menuClose,
                menuPinned,
                menuGroupby,
                menuSort,
                menuFilter,
                menuFilterOptions,
                menuBottom,
            ].join('');

            return menuAll;

    }
}
