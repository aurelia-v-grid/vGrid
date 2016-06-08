import { inject } from 'aurelia-dependency-injection';
import { ComponentService } from '../shared/component-service';

@inject(ComponentService)
export class Controls {
  constructor(componentService) {
    this.categories = componentService.getIterableComponents();
  }
}
