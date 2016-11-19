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
  private name: string;
  private field: string;
  public viewSlot: ViewSlot;
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




export class GroupingElements {
  private element: Element;
  private htmlCache: HtmlCache;
  private viewSlots: ViewSlots;
  private viewCompiler: ViewCompiler;
  private container: Container;
  private viewResources: ViewResources;
  private groupContext: GroupingContext;
  private lastAdded: string;
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


  public init(controller: Controller) {
    this.controller = controller;
    this.avgTopPanel = this.htmlCache.avg_top_panel;
  }


  public addGroup(name: string, field: string): void {


    if (!this.groupContext[name]) {
      this.lastAdded = name;
      this.groupContext[name] = new GroupContext(name, field, this);

      // view-viewslot
      let viewMarkup =
        `<div class="avg-grouping">
                    <p v-sort="field:${field}">${name}</p>
                    <p>&nbsp;&nbsp;
                        <i click.delegate="remove()" class="avg-fa avg-fa-times-circle-o" aria-hidden="true"></i>
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

    // set out viewPort class...not happy with all Im doing here


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
