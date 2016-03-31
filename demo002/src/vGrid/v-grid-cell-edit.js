
//this wil be really messy while I test whats possible

export class VGridCellEdit {


  constructor(parent){
    this.parent =parent;
    this.element = parent.element;
    this.mainKeyDown();
    this.overrideClick = false;
    this.count = 0;
    this.editMode = false;

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
              thisTop = this._private.htmlCache.rowsArray[y+direction].top;
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

    return thisTop;
  };

  getElement (top){

    var element = 0;
    for (var i = 0; i < this._private.htmlCache.rowsArray.length; i++) {
      if(this._private.htmlCache.rowsArray[i].top === top){
        element = this._private.htmlCache.rowsArray[i].div;
      }
    }

    if(element){
      this.cells = element.querySelectorAll("."+this._private.css.cellContent);
    }

  }










  mainKeyDown(){

    this.element.onkeydown = function(e) {

      console.log(e.keyCode)

      //down
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

              this.top = this.getRow(this.curElement,+1)

              var event = new MouseEvent('click', {
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

      //right
      if(e.keyCode === 39 && !this.editMode){
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

              //this.top = this.getRow(this.curElement,+1)

              var event = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
              });
              if(!this.last){
              this.cells[this.index+1].dispatchEvent(event);
              }
              //  console.log(this.cells[this.index])
            }
          },150)
        }
      }

      //left
      if(e.keyCode === 37 && !this.editMode){
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

              //this.top = this.getRow(this.curElement,+1)

              var event = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
              });
              if(!this.first){
                this.cells[this.index-1].dispatchEvent(event);
              }
              //  console.log(this.cells[this.index])
            }
          },150)
        }
      }

      //up
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

              this.top = this.getRow(this.curElement,-1);

              var event = new MouseEvent('click', {
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
                this.top = this.getRow(this.curElement,-1)
              }
              var event = new MouseEvent('click', {
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
                this.top = this.getRow(this.curElement,1)
              }
            var event = new MouseEvent('click', {
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
    this.curElement.setAttribute("readonly","false")
    this.curElement.classList.remove("vGrid-editCell");
    this.curElement.classList.remove("vGrid-editCell-write");
    this.curElement.classList.remove("vGrid-editCell-focus");
    this.top = this.getRow(this.curElement, 0)
    this.callbackDone(this.callbackObject());
    this.editMode = false;
    this.getElement(this.top);
    var event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
    this.cells[this.index].dispatchEvent(event);
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
    console.log("clickcell")
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

     // console.log(this.editMode)

      if(e.type === "dblclick" || this.editMode){
        this.editMode = true
        if(e.target.classList.contains("vGrid-editCell-focus")){
          e.target.classList.remove("vGrid-editCell-focus");
       }

        e.target.removeAttribute("readonly");//if I dont do this, then they cant enter
        e.target.classList.add("vGrid-editCell");
        e.target.classList.add("vGrid-editCell-write");

      } else {
          e.target.classList.add("vGrid-editCell-focus");
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
