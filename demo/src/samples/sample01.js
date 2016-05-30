import {dummyDataGenerator} from 'data/dummyDataGenerator'


export class sample01 {
  static inject = [Element, dummyDataGenerator];

  /********************************************************************
   *  grid bindable/functions
   ********************************************************************/

  myCollection = [];
  myCurrentEntity = {};
  myGrid = {};

  get filteredRows() {
    if (this.myGrid.ctx) {
      return this.myGrid.ctx.vGridCollectionFiltered.length
    } else {
      return 0;
    }
  }


  onRowDraw(data) {
    if (data) {
      if (data.tempRef) {
        if (data.tempRef.number > 100) {
          data.tempRef.numberColor = "green";
          data.tempRef.numberFont = "normal";
        } else {
          data.tempRef.numberColor = "red";
          data.tempRef.numberFont = "bold";
        }
      }
    }

  }


  singleClick(e) {
    console.log("click")
  }


  singleDblClick(e) {
    console.log("dblClick")
  }


  collectionLength = 0;

  /********************************************************************
   * Constructor
   ********************************************************************/
  constructor(element, dummyDataGenerator) {
    //get this element
    this.element = element;

    //this if just for giving us some data
    this.dummyDataGenerator = dummyDataGenerator;
    this.dummyDataGenerator.generateData(10000, (data) => {
      this.myCollection = data;
      this.collectionLength = this.myCollection.length;
    });

  }

  attached() {
    this.getMaxRows = this.myGrid.ctx.getMaxRows();

  }


  /********************************************************************
   *  COLLECTION MOD BUTTONS
   ********************************************************************/

  replaceBtn(x) {
    //generate and add
    if( x > 1000)this.myGrid.ctx.setLoadingOverlay(true);
    this.dummyDataGenerator.reset();
    setTimeout(()=>{
      this.dummyDataGenerator.generateData(x, (data) => {
        this.myCollection = data;
        this.collectionLength = this.myCollection.length;
        this.myGrid.ctx.setLoadingOverlay(false);
      });
     },100)
  }

  
  addBtn(x, scrollBottom) {
    //generate and add
    if( x > 1000)this.myGrid.ctx.setLoadingOverlay(true);
    setTimeout(()=>{
      this.dummyDataGenerator.generateData(x, (data) => {
        data.forEach((x) => {
          this.myCollection.push(x)
        });
        if (scrollBottom) {
          this.myGrid.ctx.scrollBottomNext();
        }
        this.myGrid.ctx.setLoadingOverlay(false);
        this.collectionLength = this.myCollection.length;
      });
    },100)
  }


  insertOneBtn() {
    try {
      this.dummyDataGenerator.generateData(1, (data) => {
        this.myCollection.splice(2, 0, data[0])
      });
    } catch (e) {
      console.log(e)
    }
  }

  insertFiveBtn() {
    try {
      for (var i = 0; i < 5; i++) {
        this.dummyDataGenerator.generateData(1, (data) => {
          this.myCollection.splice(2, 0, data[0])
        });
      }
    } catch (e) {
      console.log(e)
    }
  }


  removeFirstBtn() {
    this.myCollection.splice(0, 1);
    this.collectionLength = this.myCollection.length;
  }

  removeLastBtn() {
    this.myCollection.pop();
    this.collectionLength = this.myCollection.length;
  }

  removeFirstxBtn(x) {
    this.myCollection.splice(0, x);
    this.collectionLength = this.myCollection.length;

  }


  removeLastxBtn(x) {
    this.myCollection.splice(this.myCollection.length - x, x);
    this.collectionLength = this.myCollection.length;

  }

  miscBtn() {
    this.myCollection.pop();

    this.myCollection.splice(2, 2);

    this.myCollection.splice(4, 2);

    this.dummyDataGenerator.generateData(2, (data) => {
      this.myCollection.push(data[0]);
      this.myCollection.push(data[1]);
    });

  }

  /********************************************************************
   *  grid save/load state/report
   ********************************************************************/

  oldState = null;

  saveStateBtn() {
    this.oldState = this.myGrid.ctx.getColumns(this.oldState);
  }

  loadStateBtn() {
    if (this.oldState) {
      this.myGrid.ctx.setColumns(this.oldState);
      this.myGrid.ctx.rebuildColumns();
    }

  }

  redrawGrid() {
    var t0 = performance.now();
    this.myGrid.ctx.redrawGrid();
    var t1 = performance.now();
    console.log("redraw of grid took " + (t1 - t0) + " milliseconds.")
  }

  report() {
    this.myGrid.ctx.createReport()
  }

  redraw() {
    this.myGrid.ctx.redrawGrid()
  }

  runFilterByCode() {

    //set sorting, this will be used after the filter
    this.myGrid.ctx.setSorting({attribute: "name", asc: true}, true);
    this.myGrid.ctx.setSorting({attribute: "index", asc: true}, true);

    var simpleFilter = (attribute, value, operator)=> {
      this.myGrid.ctx.vGridFilter.queryStrings = {[attribute]: value};
      this.myGrid.ctx.rebuildColumns();
      this.myGrid.ctx.runFilter([{attribute: attribute, value: value, operator: operator}]);
    };
    simpleFilter("name", "ge", "*");
  }

}
