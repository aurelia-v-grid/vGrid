import { RenderLocation } from '@aurelia/kernel';
import { ITemplateCompiler, IContainer, IResourceDescriptions, ViewSlots } from '../interfaces';
import { OverrideContextInterface, HtmlCache } from '../interfaces';

/**
 * Creates the footer viewport
 *
 */
export class Footer {
  private htmlCache: HtmlCache;
  private viewSlots: ViewSlots;
  private ITemplateCompiler: ITemplateCompiler;
  private IContainer: IContainer;
  private IResourceDescriptions: IResourceDescriptions;
  private overrideContext: OverrideContextInterface;



  constructor(
    htmlCache: HtmlCache,
    iTemplateCompiler: ITemplateCompiler,
    iContainer: IContainer,
    iResourceDescriptions: IResourceDescriptions,
    viewSlots: ViewSlots
  ) {
    this.htmlCache = htmlCache;
    this.viewSlots = viewSlots;
    this.ITemplateCompiler = iTemplateCompiler;
    this.IContainer = iContainer;
    this.IResourceDescriptions = iResourceDescriptions;
  }



  /**
   * set the custm html if any and and overridecontext to use, then creates the viewport and binds it
   *
   */
  public init(overrideContext: OverrideContextInterface, footerStringTemplate: string): void {
    this.overrideContext = overrideContext;
    let footerTemplate = footerStringTemplate || ``.replace(/\$(au{)/g, '${');

    let viewFactory = this.ITemplateCompiler.compile(
      `<template>
      ${footerTemplate}
      </template>`,
      this.IResourceDescriptions);

    let view = viewFactory.create(this.IContainer);
    let footerViewSlot = new RenderLocation(this.htmlCache.avg_footer, true);
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
