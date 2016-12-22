import { ViewSlot } from 'aurelia-framework';
import { ViewCompiler, Container, ViewResources, ViewSlots } from '../interfaces';
import { OverrideContext , HtmlCache} from '../interfaces';

export class Footer {
  private htmlCache: HtmlCache;
  private viewSlots: ViewSlots;
  private viewCompiler: ViewCompiler;
  private container: Container;
  private viewResources: ViewResources;
  private overrideContext: OverrideContext;

  constructor(
    htmlCache: HtmlCache,
    viewCompiler: ViewCompiler,
    container: Container,
    viewResources: ViewResources,
    viewSlots: ViewSlots
  ) {
    this.htmlCache = htmlCache;
    this.viewSlots = viewSlots;
    this.viewCompiler = viewCompiler;
    this.container = container;
    this.viewResources = viewResources;
  }

  public init(overrideContext: OverrideContext, footerStringTemplate: string): void {
    this.overrideContext = overrideContext;
    let footerTemplate = footerStringTemplate || ``.replace(/\$(au{)/g, '${');

    let viewFactory = this.viewCompiler.compile(
      `<template>
      ${footerTemplate}
      </template>`,
      this.viewResources);

    let view = viewFactory.create(this.container);
    let footerViewSlot = new ViewSlot(this.htmlCache.avg_footer, true);
    footerViewSlot.add(view);

    // bind
    footerViewSlot.bind(this, {
      bindingContext: this,
      parentOverrideContext: this.overrideContext
    });
    footerViewSlot.attached();

    this.viewSlots.footerViewSlot = footerViewSlot;
  }
}
