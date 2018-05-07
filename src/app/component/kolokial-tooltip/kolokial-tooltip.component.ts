import { Component, OnInit, ViewChild, TemplateRef, ContentChild, Input, OnDestroy, ElementRef } from '@angular/core';
import { KolokialTooltipService } from './kolokial-tooltip.service';
import { KolokialTooltipAlignment, KolokialTooltipPosition } from './kolokial-tooltip.enum';
import { StringifyOptions } from 'querystring';

type Alignment = KolokialTooltipAlignment;
type Position = KolokialTooltipPosition;

@Component({
  selector: 'app-kolokial-tooltip',
  templateUrl: './kolokial-tooltip.component.html',
  styleUrls: ['./kolokial-tooltip.component.css']
})
export class KolokialTooltipComponent implements OnInit, OnDestroy {

  private _key: string;
  private _displayPosition: Position = KolokialTooltipPosition.Top;
  private _alignment: Alignment = KolokialTooltipAlignment.Middle;
  private _text: string;

  private alignments = KolokialTooltipAlignment;
  private positions = KolokialTooltipPosition;

  private visibility: boolean;
  private position: { [key: string]: number } = {
    top: null,
    right: null,
    bottom: null,
    left: null,
  };

  private tooltipDimensions: ClientRect;
  private hostLeft: number;
  private hostTop: number;
  private offset = 15;

  @ContentChild(TemplateRef) private templateVariable: TemplateRef<any>;
  @ViewChild('tooltipContainer') private tooltipContainer: ElementRef;

  @Input() public set templateKey(value: string) {
    this._key = value;
    this.tooltipService.registerTemplate(value, this);
  }

  @Input() public set text(value: string) {
    this._text = value;
  }

  public get text(): string {
    return this._text;
  }

  constructor(private tooltipService: KolokialTooltipService) { }

  ngOnInit() {
    console.log(this.tooltipDimensions);
  }

  ngOnDestroy(): void {
    this.tooltipService.unRegisterTemplate(this._key);

  }
  public show(hostDimension: ClientRect): void {
    this.visibility = true;
    this.setPosition(hostDimension);
  }

  public hide(): void {
    this.visibility = false;
  }

  private setPosition(hostPosition: ClientRect): void {
    if (hostPosition.left !== this.hostLeft || hostPosition.top !== this.hostTop) {
      const tooltipDimensions: ClientRect = this.getTooltipDimensions();
      const viewPortDimensions = this.getViewPortDimensions();
      switch (this._displayPosition) {
        case this.positions.Top: this.setPositionTop(hostPosition, viewPortDimensions, tooltipDimensions); break;
        case this.positions.Right: this.setPositionRight(hostPosition, viewPortDimensions, tooltipDimensions); break;
        case this.positions.Bottom: this.setPositionBottom(hostPosition, viewPortDimensions, tooltipDimensions); break;
        case this.positions.Left: this.setPositionLeft(hostPosition, viewPortDimensions, tooltipDimensions); break;
      }

      this.hostLeft = hostPosition.left;
      this.hostTop = hostPosition.top;
    }
  }

  private setPositionTop(hostPosition: ClientRect, viewPort, tooltipDimensions: ClientRect): void {
    this.position.bottom = Math.floor(viewPort.height - (hostPosition.top - 15));
    this.position.top = hostPosition.top - 15 - tooltipDimensions.height;

    if (this.position.top < 0) {
      this.setPositionBottom(hostPosition, viewPort, tooltipDimensions);
      return;
    }

  }

  private setPositionBottom(hostPosition: ClientRect, viewPort, tooltipDimensions: ClientRect): void {
    this.position.top = hostPosition.bottom + 15;
    this.position.bottom = Math.floor(viewPort.height - (hostPosition.bottom + 15 + tooltipDimensions.height));

    if (this.position.bottom < 0) {
      this.setPositionTop(hostPosition, viewPort, tooltipDimensions);
      return;
    }

  }

  private setPositionRight(hostPosition: ClientRect, viewPortDimensions, tooltipDimensions: ClientRect): void {

  }

  private setPositionLeft(hostPosition: ClientRect, viewPortDimensions, tooltipDimensions: ClientRect): void {

  }

  private setAlignment(alignment: Alignment): void {
    switch (alignment) {
      case this.alignments.Top:

        break;
      case this.alignments.Bottom:

        break;
      case this.alignments.Middle:

        break;
      case this.alignments.Left:

        break;
      case this.alignments.Right:

        break;
    }
  }

  private setAlignmentTop(): void {

  }

  private setAlignmentBottom(): void {

  }

  private setAlignmentVerticalMiddle(): void {

  }

  private setAlignmentHorizontalMididle(): void {

  }

  private setAlignmentLeft(): void {

  }

  private setAlignmentRight(): void {

  }

  private getTooltipDimensions(): ClientRect {
    if (this.tooltipDimensions) {
      return this.tooltipDimensions;
    }
    return this.tooltipDimensions = this.tooltipContainer.nativeElement.getBoundingClientRect();
  }

  private getViewPortDimensions() {
    return {
      height: window.innerHeight,
      width: window.innerWidth
    };
  }

  private getUnusedAlignments() {
    const alignments: Alignment[] = [];
    if (this._displayPosition === this.positions.Top || this._displayPosition === this.positions.Bottom) {
      alignments.push(this.alignments.Right, this.alignments.Left, this.alignments.Middle);
    } else if (this._displayPosition === this.positions.Left || this._displayPosition === this.positions.Right) {
      alignments.push(this.alignments.Top, this.alignments.Bottom, this.alignments.Middle);
    }

    return alignments.filter((alignment: Alignment) => {
      return !(this._alignment === alignment);
    });
  }

}
