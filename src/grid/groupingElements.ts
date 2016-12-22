import { ViewSlot } from 'aurelia-framework';
import {
  ViewCompiler,
  Container,
  ViewResources,
  HtmlCache,
  ColumnBindingContext,
  ViewSlots,
  Controller,
  GroupingContext
} from '../interfaces';

// private class
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
    this.groupingElements.removeGroup(this.name);
    this.groupingElements.removeFromGrouping(this.field);
  }
}

// tslint:disable-next-line:max-classes-per-file
export class GroupingElements {
  private element: Element;
  private htmlCache: HtmlCache;
  private viewSlots: ViewSlots;
  private viewCompiler: ViewCompiler;
  private container: Container;
  private viewResources: ViewResources;
  private groupContext: GroupingContext;
  private lastAdded: string;
  private colGroupElement: string;
  private controller: Controller;
  private avgTopPanel: Element;
  private columnBindingContext: ColumnBindingContext;

  constructor(
    element: Element,
    viewCompiler: ViewCompiler,
    container: Container,
    viewResources: ViewResources,
    htmlCache: HtmlCache,
    viewSlots: ViewSlots,
    columnBindingContext: ColumnBindingContext) {

    // basic stuff
    this.element = element;
    this.htmlCache = htmlCache;
    this.viewSlots = viewSlots;
    this.viewCompiler = viewCompiler;
    this.container = container;
    this.viewResources = viewResources;
    this.columnBindingContext = columnBindingContext;

    // group context
    this.groupContext = ({} as GroupingContext);
    this.lastAdded = null;
  }

  public init(controller: Controller, colGroupElement: string) {
    this.controller = controller;
    this.avgTopPanel = this.htmlCache.avg_top_panel;
    this.colGroupElement = colGroupElement;
  }

  public addGroup(name: string, field: string): void {
    if (!this.groupContext[name]) {
      this.lastAdded = name;
      this.groupContext[name] = new GroupContext(name, field, this);

      // view-viewslot
      // tslint:disable:max-line-length
      let viewMarkup = this.colGroupElement ||
        `<div class="avg-grouping">  
          <p class="avg-grouping-element" v-sort="field.bind:field">${name} 
            <i><svg click.delegate="remove()" class="icon iconhidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M3 4l4.3 4L3 12h1.4L8 8.7l3.5 3.3H13L8.6 8 13 4h-1.5L8 7.3 4.4 4H3z"/>
            </svg></i>
          </p>
         </div>`;

      let viewFactory = this.viewCompiler.compile(`<template>${viewMarkup}</template>`, this.viewResources);
      let view = viewFactory.create(this.container);
      let viewSlot = new ViewSlot(this.avgTopPanel, true);
      viewSlot.add(view);
      this.groupContext[name].viewSlot = viewSlot;
      this.viewSlots.groupingViewSlots.push(this.groupContext[name]);
    }
    this.groupContext[name].viewSlot.bind(this.groupContext[name]);
    this.groupContext[name].viewSlot.attached();

  }

  public removeGroup(name?: string): void {
    if (name) {
      this.groupContext[name].viewSlot.unbind();
      this.groupContext[name].viewSlot.detached();
      this.groupContext[name].viewSlot.removeAll();
      this.groupContext[name] = null; // <-- I could prb reuse them...
    } else {
      if (this.lastAdded) {
        this.groupContext[this.lastAdded].viewSlot.unbind();
        this.groupContext[this.lastAdded].viewSlot.detached();
        this.groupContext[this.lastAdded].viewSlot.removeAll();
        this.groupContext[this.lastAdded] = null;
        this.lastAdded = null;
      }
    }
  }

  public addToGrouping(): void {
    if (this.lastAdded) {
      let toAdd = this.groupContext[this.lastAdded].field;
      this.controller.addToGrouping(toAdd);
      this.lastAdded = null;
    }
  }

  public removeFromGrouping(field: string): void {
    this.controller.removeFromGrouping(field);
  }

}
