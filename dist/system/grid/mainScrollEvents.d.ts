import { HtmlCache } from './htmlCache';
import { Controller } from './controller';
export declare class MainScrollEvents {
    private element;
    private timerLeft;
    private timerMain;
    private timerRight;
    private timerVhandle;
    private timerWheel;
    private timerHhandle;
    private lastTopPosition;
    private htmlCache;
    private left;
    private main;
    private right;
    private mainHead;
    private vhandle;
    private hhandle;
    private group;
    private touchY;
    private touchX;
    private isIE11;
    private wheelEvent;
    private isScrollbar;
    private passiveSupported;
    private onWeelBinded;
    private handleEventVhandleBinded;
    private handleEventHhandleBinded;
    private touchMoveBinded;
    private touchStartBinded;
    private controller;
    constructor(element: Element, htmlCache: HtmlCache, controller: Controller);
    init(): void;
    private updateInternalHtmlCache();
    private onWeel(event);
    private addScrollEvents(type);
    private removeScrollEvents(type);
    private touchStart(e);
    private touchMove(e);
    private handleEventWheelScroll(newTopPosition, left?);
    private handleEventVhandle();
    private handleEventHhandle();
    private checkScroll(newTopPosition);
    private triggerGridScrollEvent(scrollbarScrolling, down, topPosition);
}
