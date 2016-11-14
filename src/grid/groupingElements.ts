import {ViewSlot} from 'aurelia-framework';
//for typings:
import {bindable, ViewCompiler, Container, ViewResources} from 'aurelia-framework';
import {HtmlCache} from './htmlCache';
import {ColumnBindingContext} from './columnBindingContext';
import {ViewSlots} from './viewSlots';
import {Controller} from './controller';


export class GroupingElements {
  element:any;
  htmlCache:HtmlCache;
  viewSlots:ViewSlots;
  viewCompiler:ViewCompiler;
  container:Container
  viewResources:ViewResources
  groupContext:any;
  lastAdded:any;
  controller:Controller
  avgTopPanel:any;


  constructor(element, viewCompiler, container, viewResources, htmlCache, viewSlots, columnBindingContext) {
    //basic stuff
    this.element = element;
    this.htmlCache = htmlCache;
    this.viewSlots = viewSlots;
    this.viewCompiler = viewCompiler;
    this.container = container;
    this.viewResources = viewResources;

    //group context
    this.groupContext = {};
    this.lastAdded = null;
  }


  init(controller) {
    this.controller = controller;
    this.avgTopPanel = this.htmlCache.avg_top_panel;
  }


  addGroup(name, field) {

    this.lastAdded = name;
    if (!this.groupContext[name]) {
      this.groupContext[name] = {};
      this.groupContext[name].name = name;
      this.groupContext[name].ctx = this;
      this.groupContext[name].field = field;
      this.groupContext[name].remove = function () {
        this.ctx.removeGroup(this.name);
        this.ctx.removeFromGrouping(this.field);
      };

      //view-viewslot
      let viewMarkup =
        `<div class="avg-grouping">
                    <p v-sort="${field}">${name}</p>
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

    //set out viewPort class...not happy with all Im doing here


  }


  removeGroup(name) {
    if (name) {
      this.groupContext[name].viewSlot.unbind();
      this.groupContext[name].viewSlot.detached();
      this.groupContext[name].viewSlot.removeAll();
      this.groupContext[name] = null; //<-- I could prb reuse them...
    } else {
      if (this.lastAdded) {
        this.groupContext[this.lastAdded].viewSlot.unbind();
        this.groupContext[this.lastAdded].viewSlot.detached();
        this.groupContext[this.lastAdded].viewSlot.removeAll();
        this.lastAdded = null;
      }
    }
  }


  addToGrouping() {
    let toAdd = this.groupContext[this.lastAdded].field;
    this.controller.addToGrouping(toAdd);
    this.lastAdded = null;
  }


  removeFromGrouping(field) {
    this.controller.removeFromGrouping(field);
  }


}
