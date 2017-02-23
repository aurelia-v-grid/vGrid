import { ViewSlot } from 'aurelia-framework';
import { ViewCompiler, Container, ViewResources, ViewSlots } from '../interfaces';
import { OverrideContextInterface , HtmlCache} from '../interfaces';

/**
 * Creates the footer viewport
 * 
 */
export class Footer {
  private htmlCache: HtmlCache;
  private viewSlots: ViewSlots;
  private viewCompiler: ViewCompiler;
  private container: Container;
  private viewResources: ViewResources;
  private overrideContext: OverrideContextInterface;



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



  /**
   * set the custm html if any and and overridecontext to use, then creates the viewport and binds it
   * 
   */
  public init(overrideContext: OverrideContextInterface, footerStringTemplate: string): void {
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
