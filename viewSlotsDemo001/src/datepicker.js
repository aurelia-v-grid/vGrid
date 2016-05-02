/**
 * Created by vegar on 5/2/2016.
 */
import {inject, customAttribute} from 'aurelia-framework';
import pikaday from 'pikaday';


@customAttribute('v-grid-datepicker')
@inject(Element)
export class DatePicker {
  constructor(element) {
    this.element = element;
  }


  attached() {

    var vm = this.VM;
    if (vm.attribute() === "date") {
      this.picker = new pikaday({
        field: this.element,
        onOpen: function (e) {
          if (!vm.editMode()) {
            this.hide();
          }
        }
      });
    }

    $(this.element).on('change',
      (e) => {
        if (vm.editMode()) {
          {
            vm.setValue(e.target.value);
            if(vm.cellContent){
              vm.cellContent.onblur();
              vm.setCss();
            }
          }
        } else {
          this.picker.hide()
        }


      });
  }

  get VM() {
    var value = null;
    if (this.element) {
      if (this.element.au['v-grid-cell-row']) {
        value = this.element.au['v-grid-cell-row'].viewModel;
      } else {
        if (this.element.au['v-grid-cell-header']) {
          value = this.element.au['v-grid-cell-header'].viewModel;
        }
      }
      return value;
    }
  }

  get isRow() {
    var value = false;
    if (this.element) {
      if (this.element.au['v-grid-cell-row']) {
        value = true;
      }
      return value;
    }
  }

  detached() {
    $(this.element).off('change');
  }

}



