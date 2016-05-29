/*****************************************************************************************************************
 *    VGridFooterPager
 *    Custom element for use in the footer container
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customElement, bindable} from 'aurelia-framework';
//for kendo ui bridge, remove import above
//import {bindable, customElement} from 'aurelia-templating';
//import {inject} from 'aurelia-dependency-injection';



@customElement('v-grid-pager')
@inject(Element)
export class VGridFooterPager {

  info = "";


  bind(parent) {
    this.parent = parent;
    this.vGrid = parent.vGrid;
    this.vGridConfig = parent.vGrid.vGridConfig;
    this.vGrid.vGridPager = this;

  }


  /*****************************************************
   *  element event
   ******************************************************/
  attached() {
    this.statusNextButton = false;
    this.statusLastButton = false;
    this.statusFirstButton = false;
    this.statusPrevButton = false;

  }

  updatePager(data){
     this.collectionLength = data.length;
     this.limit = data.limit;
     this.offset = data.offset;
    this.page = this.offset ? Math.ceil(this.offset/this.limit)+1:1;
    if(this.page === 1){
      this.statusFirstButton = false;
      this.statusPrevButton = false;
    } else {
      this.statusFirstButton = true;
      this.statusPrevButton = true;
    }

    if(this.offset >= this.collectionLength-this.limit){
      this.statusNextButton = false;
      this.statusLastButton = false;
    } else {
      this.statusNextButton = true;
      this.statusLastButton = true;
    }

    this.info = `Page ${this.page} of ${Math.ceil(this.collectionLength/this.limit)}, Total entities:${this.collectionLength}, page size ${this.limit}`

  }


  firstBtn(){
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = 0;
    this.vGridConfig.remoteCall()
  }



  nextBtn(){
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset + this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall()
  }



  prevBtn(){
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset - this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall()
  }



  lastBtn(){
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteLength-this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall()
  }


}
