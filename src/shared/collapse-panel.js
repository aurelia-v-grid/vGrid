import {bindable} from 'aurelia-framework';

export class CollapsePanel {
  @bindable panelTitle;
  @bindable footer;
  @bindable allowCollapse = false;
  @bindable collapsed = false;
  @bindable panelClass = 'default';

  toggle() {
    if (this.allowCollapse) {
      this.collapsed = !this.collapsed;
    }
  }
}
