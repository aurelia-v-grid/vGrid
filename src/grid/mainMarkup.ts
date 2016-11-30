import { ViewSlot } from 'aurelia-framework';
import { MainMarkupHtmlString } from './mainMarkupHtmlString';
import {
  ViewCompiler,
  Container,
  ViewResources,
  ViewFactory,
  View,
  ViewSlots,
  HtmlHeightWidth
} from '../interfaces';

export class MainMarkup {
  private element: Element;
  private viewCompiler: ViewCompiler;
  private container: Container;
  private viewResources: ViewResources;
  private htmlHeightWidth: HtmlHeightWidth;
  private viewSlots: ViewSlots;
  private viewFactory: ViewFactory;
  private view: View;

  constructor(
    element: Element,
    viewCompiler: ViewCompiler,
    container: Container,
    viewResources: ViewResources,
    htmlHeightWidth: HtmlHeightWidth,
    viewSlots: ViewSlots) {

    this.element = element;

    this.viewCompiler = viewCompiler;
    this.container = container;
    this.viewResources = viewResources;

    this.htmlHeightWidth = htmlHeightWidth;
    this.viewSlots = viewSlots;

  }

  public generateMainMarkup(): void {

    this.viewFactory = this.viewCompiler.compile(
      '<template>' + MainMarkupHtmlString + '</template>', this.viewResources);

    this.view = this.viewFactory.create(this.container);
    this.viewSlots.mainViewSlot = new ViewSlot(this.element, true);
    this.viewSlots.mainViewSlot.add(this.view);

    this.viewSlots.mainViewSlot.bind(this, {
      bindingContext: this,
      parentOverrideContext: this.htmlHeightWidth
    });

    this.viewSlots.mainViewSlot.attached();

  }

}
