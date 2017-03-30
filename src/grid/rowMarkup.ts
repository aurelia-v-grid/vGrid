import { HtmlCache } from '../interfaces';

/**
 * This creates the markup for the rows for:
 * - pinned left and right
 * - main
 * - group
 *
 */
export class RowMarkup {
  private element: Element;
  private htmlCache: HtmlCache;
  private left: Element;
  private main: Element;
  private right: Element;
  private group: Element;
  private rowHeight: number;



  constructor(element: Element, htmlCache: HtmlCache) {
    this.element = element;
    this.htmlCache = htmlCache;
  }


  /**
   * Called when grid is created to set defaults, add event listners
   *
   */
  public init(rowHeight: number): void {
    this.rowHeight = rowHeight;
    this.updateInternalHtmlCache();
    this.generateRows();
  }



  /**
   * Generate the row markup
   * called when grid is created and not used again
   *
   */
  private generateRows(): void {

    let markupLeft = '';
    let markupMain = '';
    let markupRight = '';
    let markupGroup = '';

    for (let i = 0; i < 40; i++) { // <- rows here will impact creation time

      let translateY = this.rowHeight * i;

      let avgRowMarkup = `
        <avg-row 
          class="avg-row" 
          style="height:${this.rowHeight}px; 
            transform:translate3d(0px, ${translateY}px, 0px);
            z-index:5;" 
          row="${i}">
        </avg-row>`;

      let avgRowMarkupGroup = `
        <avg-row 
          class="avg-row-helper" 
          style="height:${this.rowHeight}px; 
            transform:translate3d(0px, ${translateY}px, 0px);
            z-index:5;" 
          row="${i}">
        </avg-row>`;

      markupLeft = markupLeft + avgRowMarkup;
      markupMain = markupMain + avgRowMarkup;
      markupRight = markupRight + avgRowMarkup;
      markupGroup = markupGroup + avgRowMarkupGroup;
    }

    this.left.innerHTML = markupLeft;
    this.main.innerHTML = markupLeft;
    this.right.innerHTML = markupLeft;
    this.group.innerHTML = markupGroup;

  }



  /**
   * just adds the main html elements to class
   *
   */
  private updateInternalHtmlCache(): void {
    this.left = this.htmlCache.avg_content_left_scroll;
    this.main = this.htmlCache.avg_content_main_scroll;
    this.right = this.htmlCache.avg_content_right_scroll;
    this.group = this.htmlCache.avg_content_group_scroll;
  }
}
