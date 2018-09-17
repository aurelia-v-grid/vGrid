import { ViewSlot } from '@aurelia/runtime';
import {
  ITemplateCompiler,
  IContainer,
  IResourceDescriptions,
  HtmlCache,
  ColumnBindingContext,
  ViewSlots,
  Controller,
  GroupingContextInterface
} from '../interfaces';

// Two classes here!   GroupContext & GroupingElements



/**
 * Private class used by grouping elements
 * This is the context of the box in the top panel
 *
 */
class GroupContext {
  public viewSlot: ViewSlot;
  private name: string;
  private field: string;

  private groupingElements: GroupingElements;

  constructor(name: string, field: string, groupingElements: GroupingElements) {
    this.name = name;
    this.field = field;
    this.groupingElements = groupingElements;
  }

  public remove(): void {
    this.groupingElements.removeGroup(this.field);
    this.groupingElements.removeFromGrouping(this.field);
  }
}


/**
 * Creates the grouping elements viewports and logic
 * This take care of the top panel, when called it adds the html element with its context
 * It also fixes/sets corrcet panel when grid is created/ grouping runs by code
 *
 */
// tslint:disable-next-line:max-classes-per-file
export class GroupingElements {
  private element: Element;
  private htmlCache: HtmlCache;
  private viewSlots: ViewSlots;
  private ITemplateCompiler: ITemplateCompiler;
  private IContainer: IContainer;
  private IResourceDescriptions: IResourceDescriptions;
  private groupContext: GroupingContextInterface;
  private lastAdded: string;
  private colGroupElement: string;
  private controller: Controller;
  private avgTopPanel: Element;
  private columnBindingContext: ColumnBindingContext;

  constructor(
    element: Element,
    ITemplateCompiler: ITemplateCompiler,
    IContainer: IContainer,
    IResourceDescriptions: IResourceDescriptions,
    htmlCache: HtmlCache,
    viewSlots: ViewSlots,
    columnBindingContext: ColumnBindingContext) {

    // basic stuff
    this.element = element;
    this.htmlCache = htmlCache;
    this.viewSlots = viewSlots;
    this.ITemplateCompiler = ITemplateCompiler;
    this.IContainer = IContainer;
    this.IResourceDescriptions = IResourceDescriptions;
    this.columnBindingContext = columnBindingContext;

    // group context
    this.groupContext = ({} as GroupingContextInterface);
    this.lastAdded = null;
  }



  public getGroups(): any[] {
    const x = [];
    for (const i in this.groupContext) {
      if (i) {
        x.push(i);
      }
    }
    return x;
  }


  /**
   * Called when grid is created to set defaults, add event listners
   *
   */
  public init(controller: Controller, colGroupElement: string) {
    this.controller = controller;
    this.avgTopPanel = this.htmlCache.avg_top_panel;
    this.colGroupElement = colGroupElement;
  }



  /**
   * todo description
   *
   */
  public addGroup(name: string, field: string): void {
    if (!this.groupContext[field]) {
      this.lastAdded = field;
      this.groupContext[field] = new GroupContext(name, field, this);

      // view-viewslot
      // tslint:disable:max-line-length
      const viewMarkup = this.colGroupElement ||
        `<div class="avg-grouping">
          <p class="avg-grouping-element" v-sort="field.bind:field">${name}
            <i><svg click.delegate="remove()" class="icon iconhidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M3 4l4.3 4L3 12h1.4L8 8.7l3.5 3.3H13L8.6 8 13 4h-1.5L8 7.3 4.4 4H3z"/>
            </svg></i>
          </p>
         </div>`;

      const viewFactory = this.ITemplateCompiler.compile(`<template>${viewMarkup}</template>`, this.IResourceDescriptions);
      const view = viewFactory.create(this.IContainer);
      const viewSlot = new ViewSlot(this.avgTopPanel, true);
      viewSlot.add(view);
      this.groupContext[field].viewSlot = viewSlot;
      this.viewSlots.groupingViewSlots.push(this.groupContext[field]);
    }
    this.groupContext[field].viewSlot.bind(this.groupContext[field]);
    this.groupContext[field].viewSlot.attached();

  }



  /**
   * todo description
   *
   */
  public removeGroup(field?: string): void {
    if (field) {
      if (this.groupContext[field] !== null) {
        this.groupContext[field].viewSlot.unbind();
        this.groupContext[field].viewSlot.detached();
        this.groupContext[field].viewSlot.removeAll();
        this.groupContext[field] = null; // <-- I could prb reuse them...
      }
    } else {
      if (this.lastAdded) {
        if (this.groupContext[this.lastAdded] !== null) {
          this.groupContext[this.lastAdded].viewSlot.unbind();
          this.groupContext[this.lastAdded].viewSlot.detached();
          this.groupContext[this.lastAdded].viewSlot.removeAll();
          this.groupContext[this.lastAdded] = null;
          this.lastAdded = null;
        }
      }
    }
  }



  /**
   * todo description
   *
   */
  public addToGrouping(): void {
    if (this.lastAdded) {
      const toAddField = this.groupContext[this.lastAdded].field;
      const toAddTitle = this.groupContext[this.lastAdded].name;
      this.controller.addToGrouping({ field: toAddField, title: toAddTitle });
      this.lastAdded = null;
    }
  }



  /**
   * todo description
   *
   */
  public removeFromGrouping(field: string): void {
    this.controller.removeFromGrouping(field);
  }

}
