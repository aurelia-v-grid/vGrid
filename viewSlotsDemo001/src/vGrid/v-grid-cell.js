import {noView, customElement, processContent, bindable} from 'aurelia-framework';

@noView
@customElement('v-grid-cell')
//@processContent(false)
export class VGridCell {
   static inject = [Element]
  @bindable colNo;

  constructor(element){
    this.element = element;


  }

  bind(bindingContext){
    this.bindingContext = bindingContext;
    this.ctx = bindingContext.ctx;
    if(this.bindingContext && this.cellContent){
      this.setValue(this.bindingContext[this.ctx.vGridConfig.attributeArray[this.colNo]]);
    }
  }


  created(){
    console.log("VGridCol, created")
  }

  setValue (value){
    if(this.ctx.vGridConfig.colTypeArray[this.colNo] === "image"){
      this.cellContent.src = value;
    } else {
      this.cellContent.value = value;
    }
  }


  attached(){

     //if(this.element.classlist.contains(this.ctx.vGridConfig)){

    // }

     if(this.ctx.vGridConfig.colTypeArray[this.colNo] === "image"){
       this.cellContent = document.createElement("img");
     } else {
       this.cellContent = document.createElement("input");
     }
     this.cellContent.classList.add(this.ctx.vGridConfig.css.cellContent);
     this.cellContent.setAttribute(this.ctx.vGridConfig.atts.dataAttribute, this.ctx.vGridConfig.attributeArray[this.colNo]);
     this.cellContent.setAttribute("style", this.ctx.vGridConfig.colStyleArray[this.colNo]);
     if(this.bindingContext){
       this.setValue(this.bindingContext[this.ctx.vGridConfig.attributeArray[this.colNo]])
     }
     this.element.appendChild(this.cellContent);
  }
}
