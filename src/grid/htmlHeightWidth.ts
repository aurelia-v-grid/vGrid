import { ColConfig, ColumnBindingContext } from '../interfaces';

export class HtmlHeightWidth {
  public avgScrollBarWidth: number;
  public avgPanel_Height: number;
  public avgHeader_Height: number;
  public avgHeader_Top: number;
  public avgContent_Top: number;
  public avgContent_Bottom: number;
  public avgHeaderLeft_Width: number;
  public avgHeaderMain_Left: number;
  public avgHeaderMain_Right: number;
  public avgHeaderMainScroll_Width: number;
  public avgHeaderMainScroll_Height: number;
  public avgHeaderRight_Right: number;
  public avgHeaderRight_Width: number;
  public avgContentLeft_Width: number;
  public avgContentLeftScroll_Width: string;
  public avgContentLeftScroll_Height: number;
  public avgContentMain_Left: number;
  public avgContentMain_Right: number;
  public avgContentMainScroll_Width: number;
  public avgContentMainScroll_Height: number;
  public avgContentRight_Right: number;
  public avgContentRight_Width: number;
  public avgContentRightScroll_Width: string;
  public avgContentRightScroll_Height: number;
  public avgContentGroup_Width: number;
  public avgContentGroup_Height: number;
  public avgContentGroup_Top: number;
  public avgContentGroup_Bottom: number;
  public avgContentVhandle_Width: number;
  public avgContentVhandle_Height: number;
  public avgContentVhandle_Top: number;
  public avgContentVhandleScroll_Height: number;
  public avgContentVhandle_Bottom: number;
  public avgContentHhandle_Bottom: number;
  public avgContentHhandle_Right: number;
  public avgContentHhandle_Left: number;
  public avgContentHhandle_Height: number;
  public avgContentHhandleScroll_Width: number;
  public avgFooter_Height: number;
  public attHeaderHeight: number;
  public attRowHeight: number;
  public attFooterHeight: number;
  public attPanelHeight: number;

  constructor() {

    this.avgScrollBarWidth = this.getScrollbarWidth() || 17;

    this.avgPanel_Height = 0;

    this.avgHeader_Height = 30;
    this.avgHeader_Top = 0;

    this.avgContent_Top = 30;
    this.avgContent_Bottom = 30;

    this.avgHeaderLeft_Width = 200;

    this.avgHeaderMain_Left = 200;
    this.avgHeaderMain_Right = 150;

    this.avgHeaderMainScroll_Width = 0;
    this.avgHeaderMainScroll_Height = 100;

    this.avgHeaderRight_Right = 0;
    this.avgHeaderRight_Width = 150;

    this.avgContentLeft_Width = 200 + this.avgScrollBarWidth;

    this.avgContentLeftScroll_Width = '100%';
    this.avgContentLeftScroll_Height = 0 + this.avgScrollBarWidth;

    this.avgContentMain_Left = 200;
    this.avgContentMain_Right = 150 - this.avgScrollBarWidth;

    this.avgContentMainScroll_Width = 0;
    this.avgContentMainScroll_Height = 0;

    this.avgContentRight_Right = 0;
    this.avgContentRight_Width = 150;

    this.avgContentRightScroll_Width = '100%';
    this.avgContentRightScroll_Height = 0 + this.avgScrollBarWidth;

    this.avgContentGroup_Width = 150;
    this.avgContentGroup_Height = 0;
    this.avgContentGroup_Top = 0;
    this.avgContentGroup_Bottom = 0;

    this.avgContentVhandle_Width = 0 + this.avgScrollBarWidth;
    this.avgContentVhandle_Height = 0;
    this.avgContentVhandle_Top = 0;
    this.avgContentVhandleScroll_Height = 0;
    this.avgContentVhandle_Bottom = 0;

    this.avgContentHhandle_Bottom = 0;
    this.avgContentHhandle_Right = 0 + this.avgScrollBarWidth;
    this.avgContentHhandle_Left = 0;
    this.avgContentHhandle_Height = 17;
    this.avgContentHhandleScroll_Width = 17;

    this.avgFooter_Height = 30;
  }

  public getNewHeight(length: number): number {
    return length * this.attRowHeight;
  }

  public setCollectionLength(length: number, includeScroller?: boolean): void {
    let rowTotal = this.getNewHeight(length);
    let avgScrollbarHeightValue = includeScroller === false ? 0 : this.avgScrollBarWidth;
    let total = rowTotal + avgScrollbarHeightValue;
    this.avgContentRightScroll_Height = total;
    this.avgContentGroup_Height = total;
    this.avgContentVhandleScroll_Height = total;
    this.avgContentMainScroll_Height = total;
    this.avgContentLeftScroll_Height = total;
  }

  public addDefaultsAttributes(
    attHeaderHeight: number,
    attRowHeight: number,
    attFooterHeight: number,
    attPanelHeight: number): void {

    this.attHeaderHeight = attHeaderHeight;
    this.attRowHeight = attRowHeight;
    this.attFooterHeight = attFooterHeight;
    this.attPanelHeight = attPanelHeight;

    // set main body parts
    this.avgPanel_Height = attPanelHeight;
    this.avgHeader_Top = attPanelHeight;
    this.avgHeader_Height = attHeaderHeight;
    this.avgContent_Top = attHeaderHeight + attPanelHeight;
    this.avgContent_Bottom = attFooterHeight;
    this.avgFooter_Height = attFooterHeight;
    this.avgHeaderMainScroll_Height = attHeaderHeight;
    this.avgContentGroup_Height = this.avgContentGroup_Height;
    this.avgContentGroup_Top = this.avgContent_Top;
    this.avgContentGroup_Bottom = this.avgContent_Bottom;
    this.avgContentVhandle_Height = this.avgContentVhandle_Height;
    this.avgContentVhandle_Top = this.avgContent_Top;
    this.avgContentVhandle_Bottom = this.avgContent_Bottom;
    this.avgContentHhandle_Bottom = attFooterHeight;
    this.avgContentHhandle_Height = this.avgScrollBarWidth;
  }

  public adjustWidthsColumns(columnBindingContext: ColumnBindingContext, groupsLength: number): void {
    let left = groupsLength ? groupsLength * 15 : 0;
    let main = 0;
    let right = 0;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < columnBindingContext.setupmain.length; i++) {
      if (columnBindingContext.setupleft[i].show) {
        left = left + columnBindingContext.setupleft[i].width;
      }
      if (columnBindingContext.setupmain[i].show) {
        main = main + columnBindingContext.setupmain[i].width;
      }
      if (columnBindingContext.setupright[i].show) {
        right = right + columnBindingContext.setupright[i].width;
      }
    }

    this.avgContentLeft_Width = left;
    this.avgHeaderLeft_Width = left;

    this.avgContentMain_Left = left;
    this.avgContentMain_Right = right;
    this.avgHeaderMain_Left = left;
    this.avgHeaderMain_Right = right;

    this.avgHeaderMainScroll_Width = main;
    this.avgContentMainScroll_Width = main;

    this.avgContentRight_Width = right;
    this.avgHeaderRight_Width = right;

    this.avgContentHhandle_Right = right;
    this.avgContentHhandle_Left = left;
    this.avgContentHhandleScroll_Width = main;
  }

  public setWidthFromColumnConfig(colConfig: ColConfig[], groupsLength?: number): void {
    let left = groupsLength ? groupsLength * 15 : 0;
    let main = 0;
    let right = 0;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < colConfig.length; i++) {
      switch (true) {
        case colConfig[i].colPinLeft && colConfig[i].colPinRight:
          left = left + colConfig[i].colWidth;
          right = right + colConfig[i].colWidth;
          break;
        case colConfig[i].colPinLeft:
          left = left + colConfig[i].colWidth;
          break;
        case colConfig[i].colPinRight:
          right = right + colConfig[i].colWidth;
          break;
        case !colConfig[i].colPinLeft && !colConfig[i].colPinRight:
          main = main + colConfig[i].colWidth;
          break;
        default:
      }
    }

    this.avgContentLeft_Width = left;
    this.avgHeaderLeft_Width = left;

    this.avgContentMain_Left = left;
    this.avgContentMain_Right = right;
    this.avgHeaderMain_Left = left;
    this.avgHeaderMain_Right = right;

    this.avgHeaderMainScroll_Width = main;
    this.avgContentMainScroll_Width = main;

    this.avgContentRight_Width = right;
    this.avgHeaderRight_Width = right;

    this.avgContentHhandle_Right = right;
    this.avgContentHhandle_Left = left;
    this.avgContentHhandleScroll_Width = main;
  }

  public getScrollbarWidth(): number {
    let outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    document.body.appendChild(outer);

    let widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    let inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    let widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }

}
