import { Component, OnInit, ViewChild, TemplateRef, ContentChild, Input, OnDestroy } from '@angular/core';
import { KolokialTooltipService } from './kolokial-tooltip.service';
import { KolokialTooltipAlignment, KolokialTooltipPosition } from './kolokial-tooltip.enum';

type Alignment = KolokialTooltipAlignment;
type Position = KolokialTooltipPosition;

@Component({
  selector: 'app-kolokial-tooltip',
  templateUrl: './kolokial-tooltip.component.html',
  styleUrls: ['./kolokial-tooltip.component.css']
})
export class KolokialTooltipComponent implements OnInit, OnDestroy {

  @Input() private set displayPosition(value: 'top' | 'right' | 'bottom' | 'left') {
    switch (value) {
      case 'right': this._displayPosition = KolokialTooltipPosition.Right; break;
      case 'bottom': this._displayPosition = KolokialTooltipPosition.Bottom; break;
      case 'left': this._displayPosition = KolokialTooltipPosition.Left; break;
      case 'top':
      default: this._displayPosition = KolokialTooltipPosition.Top; break;
    }
  }

  @Input() private set alignment(value: 'top' | 'bottom' | 'middle' | 'right' | 'left') {
    switch (value) {
      case 'top': this._alignment = KolokialTooltipAlignment.Top; break;
      case 'bottom': this._alignment = KolokialTooltipAlignment.Bottom; break;
      case 'right': this._alignment = KolokialTooltipAlignment.Right; break;
      case 'left': this._alignment = KolokialTooltipAlignment.Left; break;
      case 'middle':
      default: this._alignment = KolokialTooltipAlignment.Middle; break;
    }
  }

  @Input() private set templateKey(value: string) {
    this._key = value;
    this.tooltipService.registerTemplate(value, this);
  }

  private _key: string;
  private _displayPosition: Position = KolokialTooltipPosition.Top;
  private _alignment: Alignment = KolokialTooltipAlignment.Middle;

  private alignments = KolokialTooltipAlignment;
  private positions = KolokialTooltipPosition;

  @ContentChild(TemplateRef) private templateVariable: TemplateRef<any>;

  constructor(private tooltipService: KolokialTooltipService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.tooltipService.unRegisterTemplate(this._key);
  }

  public show(hostDimension: ClientRect): void {
    console.log(hostDimension);
  }

  public hide(): void {

  }

  private setPosition(hostPosition: ClientRect): void {
    switch (this._displayPosition) {
      case this.positions.Top: this.setPositionTop(hostPosition); break;
      case this.positions.Right: this.setPositionRight(hostPosition); break;
      case this.positions.Bottom: this.setPositionBottom(hostPosition); break;
      case this.positions.Left: this.setPositionLeft(hostPosition); break;
    }
  }

  private setPositionTop(hostPosition: ClientRect): void {

  }

  private setPositionBottom(hostPosition: ClientRect): void {

  }

  private setPositionRight(hostPosition: ClientRect): void {

  }

  private setPositionLeft(hostPosition: ClientRect): void {

  }

  private getUnusedAlignments() {
    const alignments: Alignment[] = [];
    if (this._displayPosition === this.positions.Top || this._displayPosition === this.positions.Bottom) {
      alignments.push(this.alignments.Right, this.alignments.Left, this.alignments.Middle);
    } else if (this._displayPosition === this.positions.Left || this._displayPosition === this.positions.Right){
      alignments.push(this.alignments.Top, this.alignments.Bottom, this.alignments.Middle);
    }

    return alignments.filter((alignment: Alignment) => {
      return !(this._alignment === alignment);
    });
  }

}
