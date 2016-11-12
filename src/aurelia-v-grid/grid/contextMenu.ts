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
    private callback: any;


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


    public init(): void {
        let viewFactory = this.viewCompiler.compile(`<template>${this.menuHtml()}</template>`, this.viewResources);
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
        this.groupbyMenu =  options.groupby ? true : false;
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
    private menuHtml(): string{ return `
        <nav css="top:` + '${top}px;left:${left}px' + `" if.bind="show" class="avg-default avg-menu">
            <ul if.bind="show" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('close','true')" class="avg-menu__link">
                    <i class="avg-fa avg-fa-times-circle-o"></i> Close
                </p>
                </li>
            </ul>

            <ul if.bind="pinnedMenu && !filterOptionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('pinned','left', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-fa-thumb-tack"></i> Pin left
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('pinned','right', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-fa-thumb-tack"></i> Pin Right
                </p>
                </li>
            </ul>

           <ul if.bind="groupbyMenu && !filterOptionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('groupby','groupby', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-fa-sitemap"></i> group by
                </p>
                </li>
            </ul>

            <ul if.bind="sortMenu && !filterOptionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('sort','asc', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-fa-sort"></i> Sort Ascending
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('sort','desc', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-fa-sort"></i> Sort Descending
                </p>
                </li>
            </ul>

            <ul if.bind="filterMainMenu && !filterOptionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filter','showall', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-fa-globe"></i> Show All
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filter','clear', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-fa-eraser"></i> Clear current
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filter','clearall', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-fa-eraser"></i> Clear all
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filter','options', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-fa-filter"></i> Choose operator
                </p>
                </li>
            </ul>


            <ul if.bind="filterOptionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','Back', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-fa-arrow-left"></i> Back
                </p>
                </li>
            </ul>

            <ul if.bind="filterOptionsMenu" class="avg-menu__items">
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','=', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"">&#x2261</i> Equals
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','<=', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text">&#x2264</i> Less than or equal
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','>=', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"">&#x2265</i> Greater than or equal
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','<', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"">&#x22D6</i> Less than
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','>', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"">&#x22D7</i> Greater than
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','*', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"">*</i> Contains
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','!=', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"">&#x2262</i> Not equal to
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','!*', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"">&#x2223&#x22C6</i> Does not contain
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','*=', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"">&#x2261&#x22C6</i> Begins with
                </p>
                </li>
                <li class="avg-menu__item">
                <p click.delegate="menuClick('filterOption','=*', $event)" class="avg-menu__link">
                    <i class="avg-fa avg-text"">&#x22C6&#x2261</i> Ends with
                </p>
                </li>
            </ul>

        </nav>`
    }
}
