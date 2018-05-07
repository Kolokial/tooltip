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
    this.setTooltipDimensions();
    if (hostPosition.left !== this.hostLeft || hostPosition.top !== this.hostTop) {
      switch (this._displayPosition) {
        case this.positions.Top: this.setPositionTop(hostPosition); break;
        case this.positions.Right: this.setPositionRight(hostPosition); break;
        case this.positions.Bottom: this.setPositionBottom(hostPosition); break;
        case this.positions.Left: this.setPositionLeft(hostPosition); break;
      }

      this.hostLeft = hostPosition.left;
      this.hostTop = hostPosition.top;
    }
  }

  private setPositionTop(hostPosition: ClientRect): void {
    this.position.bottom = hostPosition.top + 15;
    this.position.top = hostPosition.top - 15 - this.tooltipDimensions.height;

    if (this.position.top < 0) {
      this.setPositionBottom(hostPosition);
      return;
    }

  }

  private setPositionBottom(hostPosition: ClientRect): void {
    this.position.top = hostPosition.bottom + 15;
    this.position.bottom = hostPosition.bottom + 15 + this.tooltipDimensions.height;

    if (this.position.bottom < 0) {
      this.setPositionTop(hostPosition);
      return;
    }

  }

  private setPositionRight(hostPosition: ClientRect): void {

  }

  private setPositionLeft(hostPosition: ClientRect): void {

  }

  private setTooltipDimensions() {
    if (this.tooltipDimensions) {
      return this.tooltipDimensions;
    }
    return this.tooltipDimensions = this.tooltipContainer.nativeElement.getBoundingClientRect();
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
