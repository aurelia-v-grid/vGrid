import { ViewSlot } from 'aurelia-framework';
import { ViewCompiler, Container, ViewResources, ViewSlots } from '../interfaces';
import { OverrideContext } from '../interfaces';


export class LoadingScreen {
  private element: Element;
  private viewSlots: ViewSlots;
  private viewCompiler: ViewCompiler;
  private container: Container;
  private viewResources: ViewResources;
  private loading: boolean;
  private loadingMessage: string;
  private overrideContext: OverrideContext;


  constructor(
    element: Element,
    viewCompiler: ViewCompiler,
    container: Container,
    viewResources: ViewResources,
    viewSlots: ViewSlots
  ) {
    this.element = element;
    this.viewSlots = viewSlots;
    this.viewCompiler = viewCompiler;
    this.container = container;

    this.viewResources = viewResources;
    this.loading = false;
    this.loadingMessage = 'Loading';
  }

  public init(overrideContext: OverrideContext): void {
    this.overrideContext = overrideContext;
    let loadingScreentHtml = [
      '<div class="avg-overlay" if.bind="loading">',
      '</div>',
      '<div if.two-way="loading" class="avg-progress-indicator">',
      '<div class="avg-progress-bar" role="progressbar" style="width:100%">',
      '<span>${ loadingMessage }</span>',
      '</div>',
      '</div>'
    ];

    let viewFactory = this.viewCompiler.compile(
      '<template>' +
      loadingScreentHtml.join('') +
      '</template>',
      this.viewResources);


    let view = viewFactory.create(this.container);
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


  public enable(msg?: string, collectionLength?: number): Promise<any> {
    return new Promise((resolve: Function) => {
      this.loading = collectionLength ? collectionLength > 10000 ? true : false : false;
      this.loadingMessage = msg || 'Loading';
      setTimeout(() => {
        resolve(null);
      });
    });
  }


  public disable(): Promise<any> {
    return new Promise((resolve: Function) => {
      this.loading = false;
      setTimeout(() => {
        resolve();
      });
    });
  }

}
