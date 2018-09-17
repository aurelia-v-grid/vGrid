import { ViewSlot } from '@aurelia/runtime';
import { ITemplateCompiler, IContainer, IResourceDescriptions, ViewSlots } from '../interfaces';
import { OverrideContextInterface } from '../interfaces';

/**
 * Creates the loading screen viewport and binds it
 * Controller calls this to enable/disable (show/hide) it
 *
 */
export class LoadingScreen {
  private element: Element;
  private viewSlots: ViewSlots;
  private ITemplateCompiler: ITemplateCompiler;
  private IContainer: IContainer;
  private IResourceDescriptions: IResourceDescriptions;
  private loading: boolean;
  private loadingMessage: string;
  private overrideContext: OverrideContextInterface;



  constructor(
    element: Element,
    ITemplateCompiler: ITemplateCompiler,
    IContainer: IContainer,
    IResourceDescriptions: IResourceDescriptions,
    viewSlots: ViewSlots
  ) {
    this.element = element;
    this.viewSlots = viewSlots;
    this.ITemplateCompiler = ITemplateCompiler;
    this.IContainer = IContainer;

    this.IResourceDescriptions = IResourceDescriptions;
    this.loading = false;
    this.loadingMessage = 'Loading';
  }



  /**
   * update default loading test, used by the translation
   *
   */
  public updateLoadingDefaultLoadingMessage(msg: string): void {
    this.loadingMessage = msg;
  }



  /**
   * call when creating the grid so we have custom html if any and overridecontext to use
   *
   */
  public init(overrideContext: OverrideContextInterface, loadingScreenTemplate: string): void {
    this.overrideContext = overrideContext;
    let loadingScreentHtml = loadingScreenTemplate || `
      <div class="avg-overlay" if.bind="loading">
      </div>
      <div if.two-way="loading" class="avg-progress-indicator">
      <div class="avg-progress-bar" role="progressbar" style="width:100%">
      <span>$au{ loadingMessage }</span>
      </div>
      </div>`.replace(/\$(au{)/g, '${');

    let viewFactory = this.ITemplateCompiler.compile(
      `<template>
      ${loadingScreentHtml}
      </template>`,
      this.IResourceDescriptions);

    let view = viewFactory.create(this.IContainer);
    let loadingScreenViewSlot = new ViewSlot(this.element, true);
    loadingScreenViewSlot.add(view);

    // bind
    loadingScreenViewSlot.bind(this, {
      bindingContext: this,
      parentOverrideContext: this.overrideContext
    });
    loadingScreenViewSlot.attached();

    this.viewSlots.loadingScreenViewSlot = loadingScreenViewSlot;
  }



  /**
   * shows the loadingscreen overlay until removed
   *
   */
  public enable(msg?: string, collectionLength?: number): Promise<any> {
    return new Promise((resolve: Function) => {
      this.loading = collectionLength ? collectionLength > 10000 ? true : false : false;
      this.loadingMessage = msg || '...';
      setTimeout(() => {
        resolve(null);
      });
    });
  }



  /**
   * removes the loadingscreen overlay
   *
   */
  public disable(): Promise<any> {
    return new Promise((resolve: Function) => {
      this.loading = false;
      setTimeout(() => {
        resolve();
      });
    });
  }

}
