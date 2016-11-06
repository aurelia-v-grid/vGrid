import {ViewSlot} from 'aurelia-framework';

export class LoadingScreen {

  constructor(element, viewCompiler, container, viewResources, viewSlots, overrideContext) {
    this.element = element;
    this.viewSlots = viewSlots;
    this.viewCompiler = viewCompiler;
    this.container = container;
    this.overrideContext = overrideContext;
    this.viewResources = viewResources;
    this.loading = false;
    this.loadingMessage = "Loading";
  }

  init() {

    var loadingScreentHtml = [
      '<div class="avg-overlay" if.bind="loading">',
      '</div>',
      '<div if.two-way="loading" class="avg-progress-indicator">',
      '<div class="avg-progress-bar" role="progressbar" style="width:100%">',
      '<span>${ loadingMessage }</span>',
      '</div>',
      '</div>'
    ];

    var viewFactory = this.viewCompiler.compile('<template>' + loadingScreentHtml.join("") + '</template>', this.viewResources);
    var view = viewFactory.create(this.container);
    let loadingScreenViewSlot = new ViewSlot(this.element, true);
    loadingScreenViewSlot.add(view);

    //bind
    loadingScreenViewSlot.bind(this, {
      bindingContext: this,
      parentOverrideContext: this.overrideContext
    });
    loadingScreenViewSlot.attached();

    this.viewSlots.loadingScreenViewSlot = loadingScreenViewSlot;
  }


  enable(msg, collectionLength) {
    return new Promise((resolve, reject) => {
      this.loading = collectionLength ? collectionLength > 10000 ? true : false : false;
      this.loadingMessage = msg || "Loading";
      setTimeout(() => {
        resolve()
      })
    });

  }


  disable() {
    return new Promise((resolve, reject) => {
      this.loading = false;
      setTimeout(() => {
        resolve()
      })
    });
  }

}
