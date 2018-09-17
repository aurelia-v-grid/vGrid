import { ViewSlot } from '@aurelia/runtime';
import { MainMarkupHtmlString } from './mainMarkupHtmlString';
import {
  ITemplateCompiler,
  IContainer,
  IResourceDescriptions,
  ViewFactory,
  View,
  ViewSlots,
  HtmlHeightWidth
} from '../interfaces';



/**
 * Loads the main markup and creates a viewport and binds it to our HtmlHeightWidth class
 * Viewport is added to the viewPorts class
 *
 */
export class MainMarkup {
  private element: Element;
  private ITemplateCompiler: ITemplateCompiler;
  private IContainer: IContainer;
  private IResourceDescriptions: IResourceDescriptions;
  private htmlHeightWidth: HtmlHeightWidth;
  private viewSlots: ViewSlots;
  private viewFactory: ViewFactory;
  private view: View;



  constructor(
    element: Element,
    iTemplateCompiler: ITemplateCompiler,
    iContainer: IContainer,
    iResourceDescriptions: IResourceDescriptions,
    htmlHeightWidth: HtmlHeightWidth,
    viewSlots: ViewSlots) {

    this.element = element;

    this.ITemplateCompiler = iTemplateCompiler;
    this.IContainer = iContainer;
    this.IResourceDescriptions = iResourceDescriptions;

    this.htmlHeightWidth = htmlHeightWidth;
    this.viewSlots = viewSlots;

  }



  /**
   * Generates the main markup/skeleton of the grid
   *
   */
  public generateMainMarkup(): void {

    this.viewFactory = this.ITemplateCompiler.compile(
      '<template>' + MainMarkupHtmlString + '</template>', this.IResourceDescriptions);

    this.view = this.viewFactory.create(this.IContainer);
    this.viewSlots.mainViewSlot = new ViewSlot(this.element, true);
    this.viewSlots.mainViewSlot.add(this.view);

    this.viewSlots.mainViewSlot.bind(this, {
      bindingContext: this,
      parentOverrideContext: this.htmlHeightWidth
    });

    this.viewSlots.mainViewSlot.attached();

  }

}
