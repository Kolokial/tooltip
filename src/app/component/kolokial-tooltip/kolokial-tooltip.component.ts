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

  private _key: string;
  private _displayPosition: Position = KolokialTooltipPosition.Top;
  private _alignment: Alignment = KolokialTooltipAlignment.Middle;
  private _text: string;

  private alignments = KolokialTooltipAlignment;
  private positions = KolokialTooltipPosition;

  private position: { [key: string]: number } = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  @ContentChild(TemplateRef) private templateVariable: TemplateRef<any>;

  @Input() public set templateKey(value: string) {
    this._key = value;
    this.tooltipService.registerTemplate(value, this);
  }

  @Input() public set text(value: string) {
    this._text = value;
  }

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
    } else if (this._displayPosition === this.positions.Left || this._displayPosition === this.positions.Right) {
      alignments.push(this.alignments.Top, this.alignments.Bottom, this.alignments.Middle);
    }

    return alignments.filter((alignment: Alignment) => {
      return !(this._alignment === alignment);
    });
  }

}
