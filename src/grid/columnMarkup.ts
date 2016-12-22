import { ViewSlot } from 'aurelia-framework';
import { ColumnMarkupHelper } from './columnMarkupHelper';
import {
  ViewCompiler,
  Container,
  ViewResources,
  ViewFactory,
  HtmlCache,
  ColumnBindingContext,
  ViewSlots,
  ColConfig,
  OverrideContext
} from '../interfaces';

export class ColumnMarkup {
  private element: Element;
  private htmlCache: HtmlCache;
  private viewSlots: ViewSlots;
  private columnBindingContext: ColumnBindingContext;
  private markupHelper: ColumnMarkupHelper;
  private viewCompiler: ViewCompiler;
  private container: Container;
  private viewResources: ViewResources;
  private overrideContext: OverrideContext;
  private colConfig: ColConfig[];
  private configLength: number;
  private colRepeater: boolean;
  private colRepeatRowTemplate: string;
  private colRepeatHeaderTemplate: string;
  private colGroup: string;
  private leftScroll: Element;
  private mainScroll: Element;
  private rightScroll: Element;
  private groupScroll: Element;
  private leftHeader: Element;
  private mainHeader: Element;
  private rightHeader: Element;
  private leftRows: NodeListOf<Element>;
  private mainRows: NodeListOf<Element>;
  private rightRows: NodeListOf<Element>;
  private groupRows: NodeListOf<Element>;
  private rowLength: number;

  constructor(
    element: Element,
    viewCompiler: ViewCompiler,
    container: Container,
    viewResources: ViewResources,
    htmlCache: HtmlCache,
    viewSlots: ViewSlots,
    columnBindingContext: ColumnBindingContext
  ) {

    this.element = element;
    this.htmlCache = htmlCache;
    this.viewSlots = viewSlots;
    this.columnBindingContext = columnBindingContext;
    this.markupHelper = new ColumnMarkupHelper();
    this.viewCompiler = viewCompiler;
    this.container = container;
    this.viewResources = viewResources;

  }

  public init(
    colConfig: ColConfig[],
    overrideContext: OverrideContext,
    colRepeater: boolean,
    colRepeatRowTemplate: string,
    colRepeatRowHeaderTemplate: string,
    colGroup: string,
  ): void {
    this.overrideContext = overrideContext;
    this.colConfig = colConfig;
    this.configLength = colConfig.length;
    this.colRepeater = colRepeater;
    this.colRepeatRowTemplate = colRepeatRowTemplate;
    this.colRepeatHeaderTemplate = colRepeatRowHeaderTemplate;
    this.colGroup = colGroup;
    this.updateInternalHtmlCache();
    if (this.colConfig.length > 0) {
      this.markupHelper.generate(this.colConfig);
    }

    this.generateColumns();
  }

  private getRowViews(type: string): ViewFactory {
    let viewMarkup = '';
    let markupArray: string[] = [];

    // group column
    if (type === 'group') {

      // default markup
      let defaultMarkup: string[] = [
        '<i click.delegate="changeGrouping(rowRef)">',
        '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">',
        '<path show.bind="rowRef.__groupExpanded" d="M4.8 7.5h6.5v1H4.8z"/>',
        '<path show.bind="!rowRef.__groupExpanded" d="M7.4 4.8v2.7H4.7v1h2.7v3h1v-3h2.8v-1H8.5V4.8h-1z"/>',
        '</svg>',
        '</i>&nbsp;${rowRef.__groupName} (${rowRef.__groupTotal})',
      ];

      // if user supplied markup we use that, else default 
      let gTemplate: string = this.colGroup || defaultMarkup.join('');

      // all markup 
      markupArray = [
        '<avg-col ',
        'class="avg-col-group"',
        'if.bind="rowRef.__group ===true"',
        'css="left:${rowRef.__groupLvl ? rowRef.__groupLvl *15:0}px;right:0">',
        gTemplate,
        '</avg-col>'
      ];

      viewMarkup = markupArray.join('');
    } else {
      if (this.colRepeater && type === 'main') {
        let style = 'style="left:0;right:0"';
        viewMarkup = `<avg-repeat \
                        class="avg-col" \
                        if.bind="rowRef.__group !== true" ${style}>${this.colRepeatRowTemplate}\
                      </avg-repeat>`;
      } else {
        for (let i = 0; i < this.configLength; i++) {

          let style: string;
          switch (type) {
            case 'left':
              style = 'css="width:${setupleft[' + i + '].width}px;\
                            left:${setupleft[' + i + '].left+ (setupgrouping * 15)}px"';
              break;
            case 'main':
              style = 'css="width:${setupmain[' + i + '].width}px;\
                            left:${setupmain[' + i + '].left}px"';
              break;
            case 'right':
              style = 'css="width:${setupright[' + i + '].width}px;\
                            left:${setupright[' + i + '].left}px"';
              break;
            default:
          }

          let template = this.colConfig[i].__colRowTemplateGenerated;
          let colMarkup = `<avg-col \
                              class="avg-col" \
                              if.bind="setup${type}[${i}].show && rowRef.__group !== true" ${style}>${template}\
                          </avg-col>`;

          viewMarkup = viewMarkup + colMarkup;

        }
      }
    }

    // this is the block that puches the column from left for grouping
    let groupingBlock = '';
    if (type === 'left') {
      groupingBlock = '<avg-col \
      class="avg-col-grouping" \
      css="left:0px;width:${rowRef.__groupLvl ? rowRef.__groupLvl *15:0}px"></avg-col>';
    }
    return this.viewCompiler.compile(`<template>${groupingBlock + viewMarkup}</template>`, this.viewResources);
  }

  private createColSetupContext(type: string): void {

    let leftCur = 0;
    for (let i = 0; i < this.configLength; i++) {

      let widthCur = this.colConfig[i].colWidth;
      let showme = false;
      switch (type) {
        case 'left':
          showme = this.colConfig[i].colPinLeft;
          break;
        case 'main':
          showme = !this.colConfig[i].colPinLeft && !this.colConfig[i].colPinRight;
          break;
        case 'right':
          showme = this.colConfig[i].colPinRight;
          break;
        default:
      }

      this.columnBindingContext['setup' + type].push({
        width: widthCur,
        show: showme,
        left: leftCur
      });
      if (showme) {
        leftCur = leftCur + widthCur;
      }
    }

  }

  private getHeaderViews(type: string): ViewFactory {
    let viewMarkup = '';

    if (this.colRepeater && type === 'main' && this.colRepeatHeaderTemplate) {
      // if repeater and main, we add to the 
      let style = 'css="left:0;right:0"';
      viewMarkup = `<div class="avg-col" ${style}>${this.colRepeatHeaderTemplate}</div>`;
    } else {
      for (let i = 0; i < this.configLength; i++) {
        let style: string;
        switch (type) {
          case 'left':
            style = 'css="width:${setupleft[' + i + '].width}px;\
                          left:${setupleft[' + i + '].left + (setupgrouping * 15)}px"';
            break;
          case 'main':
            style = 'css="width:${setupmain[' + i + '].width}px;\
                          left:${setupmain[' + i + '].left}px"';
            break;
          case 'right':
            style = 'css="width:${setupright[' + i + '].width}px;\
                          left:${setupright[' + i + '].left}px"';
            break;
          default:
        }

        let template = this.colConfig[i].__colHeaderTemplateGenerated;
        let colMarkup = `<avg-col \
                            avg-type="${type}" \
                            avg-config-col="${i}" \
                            class="avg-col" \
                            if.bind="setup${type}[${i}].show" \
                            ${style}>${template}\
                          </avg-col>`;

        viewMarkup = viewMarkup + colMarkup;
      }
    }

    // this is the block that puches the column from left for grouping
    let groupingBlock = '';
    if (type === 'left') {
      groupingBlock = '<avg-col \
                          class="avg-col-grouping-header" \
                          css="left:0px;width:${setupgrouping ? (setupgrouping * 15):0}px"> \
                       </avg-col>';
    }

    return this.viewCompiler.compile(`<template>${groupingBlock + viewMarkup}</template>`, this.viewResources);

  }

  private generateColumns(): void {

    if (this.columnBindingContext.setupmain.length === 0) {
      // grid hidden by if.bind...lets keep what ever is in here
      this.createColSetupContext('left');
      this.createColSetupContext('main');
      this.createColSetupContext('right');
      this.createColSetupContext('group');
    }

    let viewFactoryLeft = this.getRowViews('left');
    let viewFactoryMain = this.getRowViews('main');
    let viewFactoryRight = this.getRowViews('right');
    let viewFactoryGroup = this.getRowViews('group');

    for (let i = 0; i < this.rowLength; i++) {
      this.viewSlots.leftRowViewSlots[i] = this.createViewSlot(this.leftRows[i], viewFactoryLeft);
      this.viewSlots.mainRowViewSlots[i] = this.createViewSlot(this.mainRows[i], viewFactoryMain);
      this.viewSlots.rightRowViewSlots[i] = this.createViewSlot(this.rightRows[i], viewFactoryRight);
      this.viewSlots.groupRowViewSlots[i] = this.createViewSlot(this.groupRows[i], viewFactoryGroup);
      this.htmlCache.rowCache[i].leftRowViewSlot = this.viewSlots.leftRowViewSlots[i];
      this.htmlCache.rowCache[i].mainRowViewSlot = this.viewSlots.mainRowViewSlots[i];
      this.htmlCache.rowCache[i].rightRowViewSlot = this.viewSlots.rightRowViewSlots[i];
      this.htmlCache.rowCache[i].groupRowViewSlot = this.viewSlots.groupRowViewSlots[i];
    }

    let viewFactoryHeaderLeft = this.getHeaderViews('left');
    let viewFactoryHeaderMain = this.getHeaderViews('main');
    let viewFactoryHeaderRight = this.getHeaderViews('right');

    this.viewSlots.leftHeaderViewSlot = this.createViewSlot(this.leftHeader, viewFactoryHeaderLeft);
    this.viewSlots.mainHeaderViewSlot = this.createViewSlot(this.mainHeader, viewFactoryHeaderMain);
    this.viewSlots.rightHeaderViewSlot = this.createViewSlot(this.rightHeader, viewFactoryHeaderRight);
  }

  private createViewSlot(element: Element, viewFactory: ViewFactory): ViewSlot {

    let view = viewFactory.create(this.container); // <<< time consumer, I should rebuild ?
    let viewSlot = new ViewSlot(element, true);
    viewSlot.add(view);
    return viewSlot;
  }

  private updateInternalHtmlCache(): void {
    this.leftScroll = this.htmlCache.avg_content_left_scroll;
    this.mainScroll = this.htmlCache.avg_content_main_scroll;
    this.rightScroll = this.htmlCache.avg_content_right_scroll;
    this.groupScroll = this.htmlCache.avg_content_group_scroll;

    this.leftHeader = this.htmlCache.avg_header_left;
    this.mainHeader = this.htmlCache.avg_header_main_scroll;
    this.rightHeader = this.htmlCache.avg_header_right;

    this.leftRows = this.htmlCache.avg_left_rows;
    this.mainRows = this.htmlCache.avg_main_rows;
    this.rightRows = this.htmlCache.avg_right_rows;
    this.groupRows = this.htmlCache.avg_group_rows;

    this.rowLength = this.leftRows.length;
  }

}
