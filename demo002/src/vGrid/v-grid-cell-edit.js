
//this wil be really messy while I test whats possible

export class VGridCellEdit {


  constructor(parent){
    this.parent =parent;
    this.element = parent.element;
    this.mainKeyDown();
    this.overrideClick = false;
    this.count = 0;

  }



  /****************************************************************************************************************************
   * used with click event to get row number of the one click on
   ****************************************************************************************************************************/
  getRow(e, direction) {
    var thisTop;
    var element;
    var x = 10;
    var node = e;
    for (var i = 0; i < x; i++) {
      try {
        //21 march fix, will get bad result if I do it any other way
        if (node.classList.contains(this._private.css.row)) {
          for (var y = 0; y < this._private.htmlCache.rowsArray.length; y++) {
            if (node.style.transform === this._private.htmlCache.rowsArray[y].div.style.transform) {
              thisTop = this._private.htmlCache.rowsArray[y].top;
              element = this._private.htmlCache.rowsArray[y+direction].div;
            }
          }
        }
        node = node.offsetParent;
      } catch (x) {
      }
    }

    var rowHeight = this._private.rowHeight;
    var currentRow = Math.round(thisTop / rowHeight);
    if(element){
      this.cells = element.querySelectorAll("."+this._private.css.cellContent);
    }

    //return element.querySelectorAll("."+this._private.css.cellContent);
  };



  mainKeyDown(){

    this.element.onkeydown = function(e) {

      if(e.keyCode === 40){
        e.preventDefault();
        if(!this.timer){
          this.timer = setTimeout(()=>{
            this.count = 0;
            this.timer = null;
            //console.log("-tab")
            if(this.curElement){
              this.oldElement = this.curElement;
              this.curElement.setAttribute("readonly","false")
              this.curElement.classList.remove("vGrid-editCell");
              this.curElement.classList.remove("vGrid-editCell-write");
              // this.index = this.index-1;
              // if(this.first){
              //   this.index = this.cells.length-1
                 this.getRow(this.curElement,+1)
              // }
              //console.log(this.index)
              if(this.type === "dblclick"){


              } else {
                this.overrideClick = true;
              }
              var event = new MouseEvent('dblclick', {
                'view': window,
                'bubbles': true,
                'cancelable': true
              });
              this.cells[this.index].dispatchEvent(event);
              //  console.log(this.cells[this.index])
            }
          },150)
        }
      }

      if(e.keyCode === 38){
        e.preventDefault();
        if(!this.timer){
          this.timer = setTimeout(()=>{
            this.count = 0;
            this.timer = null;
            //console.log("-tab")
            if(this.curElement){
              this.oldElement = this.curElement;
              this.curElement.setAttribute("readonly","false")
              this.curElement.classList.remove("vGrid-editCell");
              this.curElement.classList.remove("vGrid-editCell-write");
              // this.index = this.index-1;
              // if(this.first){
              //   this.index = this.cells.length-1
              this.getRow(this.curElement,-1)
              // }
              //console.log(this.index)
              if(this.type === "dblclick"){


              } else {
                this.overrideClick = true;
              }
              var event = new MouseEvent('dblclick', {
                'view': window,
                'bubbles': true,
                'cancelable': true
              });
              this.cells[this.index].dispatchEvent(event);
              //  console.log(this.cells[this.index])
            }
          },150)
        }
      }








      if(e.keyCode === 9 && e.shiftKey ===true){
        e.preventDefault();
        if(!this.timer){
          this.timer = setTimeout(()=>{
            this.count = 0;
            this.timer = null;
            //console.log("-tab")
            if(this.curElement){
              this.oldElement = this.curElement;
              this.curElement.setAttribute("readonly","false")
              this.curElement.classList.remove("vGrid-editCell");
              this.curElement.classList.remove("vGrid-editCell-write");
              this.index = this.index-1;
              if(this.first){
                this.index = this.cells.length-1
                this.getRow(this.curElement,-1)
              }
              //console.log(this.index)
              if(this.type === "dblclick"){


              } else {
                this.overrideClick = true;
              }
              var event = new MouseEvent('dblclick', {
                'view': window,
                'bubbles': true,
                'cancelable': true
              });
              this.cells[this.index].dispatchEvent(event);
              //  console.log(this.cells[this.index])
            }
          },150)
        }
      }

      if(e.keyCode === 9 && e.shiftKey ===false){
        e.preventDefault();

        if(!this.timer){
          this.timer = setTimeout(()=>{
            this.count = 0;
            this.timer = null;
            //console.log("tab")
            if(this.curElement){
              this.oldElement = this.curElement;
              this.curElement.setAttribute("readonly","false")
              this.curElement.classList.remove("vGrid-editCell");
              this.curElement.classList.remove("vGrid-editCell-write");
              this.curElement.classList.remove("vGrid-editCell-focus");
              this.index = this.index+1;
              if(this.last){
                this.index = 0
                this.getRow(this.curElement,1)
              }
              //console.log(this.index)
              if(this.type === "dblclick"){


              } else {
                this.overrideClick = true;
              }
              var event = new MouseEvent('dblclick', {
                'view': window,
                'bubbles': true,
                'cancelable': true
              });
              this.cells[this.index].dispatchEvent(event);
              //  console.log(this.cells[this.index])
            }
          },150)
        }
      }
    }.bind(this)

  }



  elementBlur(){

    this.curElement.classList.remove("vGrid-editCell");
    this.callbackDone(this.callbackObject());

  }


  elementKeyDown(){

    this.curElement.onkeydown = (e) => {
      if (e.keyCode == 13) {
        this.elementBlur();
        return false;
      }
      if (this.readOnly === true && e.keyCode!==9) {
        return false;
      } else {
        return true;
      }
    };

  }

  callbackObject (){
    return {
      attribute: this.attribute,
      value: this.curElement.value,
      oldValue: this.oldValue,
      element: this.curElement
    };
  }


  elementKeyUp(){
    this.curElement.onkeyup = (ex) => {
      this.callbackKey(this.callbackObject());
    };
  }


  editCellhelper(e, readOnly, callbackDone, callbackKey) {

    if(!this._private){
      this._private = this.parent.gridContext.ctx._private;
    }

    if (e.target.classList.contains(this._private.css.cellContent)) {

      this.curElement = e.target;
      this.readOnly = readOnly;
      this.callbackDone = callbackDone;
      this.callbackKey = callbackKey;
      this.oldValue = e.target.value;
      this.attribute = e.target.getAttribute(this._private.atts.dataAttribute);
      this.index = this._private.attributeArray.indexOf(this.attribute);
      //console.log(this._private.attributeArray.indexOf(this.attribute))
      this.type = e.type;
      this.cells = this.curElement.offsetParent.offsetParent.querySelectorAll("."+this._private.css.cellContent);
      this.row = this.parent.filterRow;


      //
      setTimeout(()=>{
        this._private.htmlCache.header.scrollLeft = this._private.htmlCache.content.scrollLeft
      },10);



      if(this.index === this.cells.length-1){
        this.last = true;
      } else {
        this.last = false;
      }
      if(this.index === 0){
        this.first = true;
      } else {
        this.first = false;
      }


      if(e.type === "dblclick" && !this.overrideClick){
        if(e.target.classList.contains("vGrid-editCell-focus")){
          e.target.classList.remove("vGrid-editCell-focus");
       }

        e.target.removeAttribute("readonly");//if I dont do this, then they cant enter
        e.target.classList.add("vGrid-editCell");
        e.target.classList.add("vGrid-editCell-write");

      } else {
        if(!this.overrideClick){
          e.target.classList.add("vGrid-editCell-focus");
        }
        if(this.overrideClick && e.type === "dblclick"){
          e.target.classList.add("vGrid-editCell-focus");
        }
      }




      if(this.overrideClick){
        this.overrideClick = false;
        this.type = "click";
        e.target.classList.add("vGrid-editCell");
      }

      this.elementKeyUp();
      this.elementKeyDown();
      this.curElement.onblur=(e)=>{
        e.target.setAttribute("readonly","false")
        e.target.classList.remove("vGrid-editCell");
        e.target.classList.remove("vGrid-editCell-write");
        e.target.classList.remove("vGrid-editCell-focus");


      }
      this.curElement.focus();

    }






  };





}
