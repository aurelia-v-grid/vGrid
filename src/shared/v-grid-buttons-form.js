import {inject, bindable, customElement} from 'aurelia-framework';


@customElement('v-grid-buttons-form')
export class vGridButtonsFrom {
  @bindable context;


  attached() {
    this.dummyDataGenerator = this.context.dummyDataGenerator;
    this.myGrid = this.context.myGrid;
    this.getMaxRows = this.context.myGrid.ctx.getMaxRows();
    this.collectionLength = this.context.myCollection.length;
  }

  replaceBtn(x) {
    //generate and add
    if (x > 1000)this.myGrid.ctx.setLoadingOverlay(true);
    this.dummyDataGenerator.reset();
    setTimeout(()=> {
      this.dummyDataGenerator.generateData(x, (data) => {
        this.context.myCollection = data;
        this.collectionLength = this.context.myCollection.length;
        this.myGrid.ctx.setLoadingOverlay(false);
      });
    }, 100)
  }


  addBtn(x, scrollBottom) {
    //generate and add
    if (x > 1000)this.myGrid.ctx.setLoadingOverlay(true);
    setTimeout(()=> {
      this.dummyDataGenerator.generateData(x, (data) => {
        data.forEach((x) => {
          this.context.myCollection.push(x)
        });
        if (scrollBottom) {
          this.myGrid.ctx.scrollBottomNext();
        }
        this.myGrid.ctx.setLoadingOverlay(false);
        this.collectionLength = this.context.myCollection.length;
      });
    }, 100)
  }


  insertOneBtn() {
    try {
      this.dummyDataGenerator.generateData(1, (data) => {
        this.context.myCollection.splice(2, 0, data[0])
      });
    } catch (e) {
      console.log(e)
    }
  }

  insertFiveBtn() {
    try {
      for (var i = 0; i < 5; i++) {
        this.dummyDataGenerator.generateData(1, (data) => {
          this.context.myCollection.splice(2, 0, data[0])
        });
      }
    } catch (e) {
      console.log(e)
    }
  }


  removeFirstBtn() {
    this.context.myCollection.splice(0, 1);
    this.collectionLength = this.context.myCollection.length;
  }

  removeLastBtn() {
    this.context.myCollection.pop();
    this.collectionLength = this.context.myCollection.length;
  }

  removeFirstxBtn(x) {
    this.context.myCollection.splice(0, x);
    this.collectionLength = this.context.myCollection.length;

  }


  removeLastxBtn(x) {
    this.context.myCollection.splice(this.context.myCollection.length - x, x);
    this.collectionLength = this.context.myCollection.length;

  }

  miscBtn() {
    this.context.myCollection.pop();

    this.context.myCollection.splice(2, 2);

    this.context.myCollection.splice(4, 2);

    this.dummyDataGenerator.generateData(2, (data) => {
      this.context.myCollection.push(data[0]);
      this.context.myCollection.push(data[1]);
    });

  }


}
