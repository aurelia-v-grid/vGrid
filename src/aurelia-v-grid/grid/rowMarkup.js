export class RowMarkup {

  constructor(element, htmlCache) {
    this.element = element;
    this.htmlCache = htmlCache;
  }


  updateInternalHtmlCache() {
    this.left = this.htmlCache.avg_content_left_scroll;
    this.main = this.htmlCache.avg_content_main_scroll;
    this.right = this.htmlCache.avg_content_right_scroll;
    this.full = this.htmlCache.avg_content_group_scroll;
  }


  init(rowHeight) {
    this.rowHeight = rowHeight;
    this.updateInternalHtmlCache();
    this.generateRows();
  }


  generateRows() {

    let markupLeft = "";
    let markupMain = "";
    let markupRight = "";
    let markupGroup = "";


    for (var i = 0; i < 40; i++) { //<- rows here will impact creation time

      let translateY = this.rowHeight * i;

      let avgRowMarkup = `<avg-row class="avg-row" style="height:${this.rowHeight}px; transform:translate3d(0px, ${translateY}px, 0px);z-index:5;" row="${i}"></avg-row>`;
      let avgRowMarkupGroup = `<avg-row class="avg-row-helper" style="height:${this.rowHeight}px; transform:translate3d(0px, ${translateY}px, 0px);z-index:5;" row="${i}"></avg-row>`;


      markupLeft = markupLeft + avgRowMarkup;
      markupMain = markupMain + avgRowMarkup;
      markupRight = markupRight + avgRowMarkup;
      markupGroup = markupGroup + avgRowMarkupGroup;
    }

    this.left.innerHTML = markupLeft;
    this.main.innerHTML = markupLeft;
    this.right.innerHTML = markupLeft;
    this.full.innerHTML = markupGroup;

  }


}
