import { Component, OnInit, ViewChild, TemplateRef, ContentChild, Input, OnDestroy, ElementRef } from '@angular/core';
import { KolokialTooltipService } from './kolokial-tooltip.service';
import { KolokialTooltipAlignment, KolokialTooltipPosition } from './kolokial-tooltip.enum';
import { Dimensions } from './Ikolokial-tooltip';

type Alignment = KolokialTooltipAlignment;
type Position = KolokialTooltipPosition;

@Component({
  selector: 'app-kolokial-tooltip',
  templateUrl: './kolokial-tooltip.component.html',
  styleUrls: ['./kolokial-tooltip.component.css']
})
export class KolokialTooltipComponent implements OnInit, OnDestroy {

  private _key: string;
  private _displayPosition: Position = KolokialTooltipPosition.Right;
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
  private viewPortDimensions: Dimensions;
  private hostDimensions: Dimensions;
  private hostPosition: ClientRect;
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
  public show(hostPosition: ClientRect): void {
    this.visibility = true;
    this.hostPosition = hostPosition;
    this.setPosition();
  }

  public hide(): void {
    this.visibility = false;
  }

  private setPosition(): void {
    if (this.hostPosition.left !== this.hostLeft || this.hostPosition.top !== this.hostTop) {
      this.tooltipDimensions = this.getTooltipDimensions();
      this.viewPortDimensions = this.getViewPortDimensions();
      this.hostDimensions = this.getHostDimensions();
      switch (this._displayPosition) {
        case this.positions.Top: this.setPositionTop(); break;
        case this.positions.Right: this.setPositionRight(); break;
        case this.positions.Bottom: this.setPositionBottom(); break;
        case this.positions.Left: this.setPositionLeft(); break;
      }

      this.hostLeft = this.hostPosition.left;
      this.hostTop = this.hostPosition.top;
    }
  }

  private setPositionTop(): void {
    this.position.bottom = Math.floor(this.viewPortDimensions.height - (this.hostPosition.top - 15));
    this.position.top = this.hostPosition.top - 15 - this.tooltipDimensions.height;

    if (this.position.top < 0) {
      this.setPositionBottom();
      return;
    }
    this.setAlignment(this._alignment, this.positions.Top);
  }

  private setPositionBottom(): void {
    this.position.top = Math.floor(this.hostPosition.bottom + this.offset);
    this.position.bottom = Math.floor(this.viewPortDimensions.height - (this.hostPosition.bottom + 15 + this.tooltipDimensions.height));

    if (this.position.bottom < 0) {
      this.setPositionTop();
      return;
    }
    this.setAlignment(this._alignment, this.positions.Bottom);
  }

  private setPositionRight(): void {
    this.position.left = Math.floor(this.hostPosition.right + this.offset);
    this.position.right = Math.floor(this.viewPortDimensions.width - (this.position.left + this.tooltipDimensions.width));

    if (this.position.right < 0) {
      this.setPositionLeft();
      return;
    }
    this.setAlignment(this._alignment, this.positions.Right);
  }

  private setPositionLeft(): void {

  }

  private setAlignment(alignment: Alignment, position: Position): void {
    switch (alignment) {
      case this.alignments.Top: this.setAlignmentTop(); break;
      case this.alignments.Bottom: this.setAlignmentBottom(); break;
      case this.alignments.Middle:
        if (position === this.positions.Top || position === this.positions.Bottom) {
          this.setAlignmentHorizontalMiddle();
        } else if (position === this.positions.Left || position === this.positions.Right) {
          this.setAlignmentVerticalMiddle();
        }
        break;
      case this.alignments.Left: this.setAlignmentLeft(); break;
      case this.alignments.Right: this.setAlignmentRight(); break;
    }
  }

  private setAlignmentTop(): void {
    this.position.top = Math.floor(this.hostPosition.top);
    this.position.bottom = Math.floor(this.viewPortDimensions.height -  (this.position.top + this.tooltipDimensions.height));
  }

  private setAlignmentBottom(): void {
    this.position.top = Math.floor(this.hostPosition.bottom - this.tooltipDimensions.height);
    this.position.bottom = Math.floor(this.viewPortDimensions.height - (this.hostPosition.bottom));
  }

  private setAlignmentVerticalMiddle(): void {
    this.position.top = Math.floor((this.hostPosition.top + (this.hostDimensions.height / 2)) - (this.tooltipDimensions.height / 2));
    this.position.bottom = Math.floor(this.viewPortDimensions.height - (this.position.top + this.tooltipDimensions.height));
  }

  private setAlignmentHorizontalMiddle(): void {
    this.position.left = Math.floor(this.hostPosition.left + (this.hostPosition.width / 2)) - (this.tooltipDimensions.width / 2);
    this.position.right = Math.floor(this.viewPortDimensions.width - (this.position.left + this.tooltipDimensions.width));
  }

  private setAlignmentLeft(): void {
    this.position.left = Math.floor(this.hostPosition.left);
    this.position.right = Math.floor(this.viewPortDimensions.width - (this.position.left + this.tooltipDimensions.width));
  }

  private setAlignmentRight(): void {
    this.position.left = Math.floor(this.hostPosition.right - this.tooltipDimensions.width);
    this.position.right = Math.floor(this.viewPortDimensions.width - (this.hostPosition.right));
  }

  private getTooltipDimensions(): ClientRect {
    if (this.tooltipDimensions) {
      return this.tooltipDimensions;
    }
    return this.tooltipDimensions = this.tooltipContainer.nativeElement.getBoundingClientRect();
  }

  private getViewPortDimensions(): Dimensions {
    return {
      height: window.innerHeight,
      width: window.innerWidth
    };
  }

  private getHostDimensions(): Dimensions {
    return {
      height: Math.floor(this.hostPosition.bottom - this.hostPosition.top),
      width: Math.floor(this.hostPosition.right - this.hostPosition.left)
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
