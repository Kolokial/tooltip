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

  @ContentChild(TemplateRef) private templateVariable: TemplateRef<any>;

  constructor(private tooltipService: KolokialTooltipService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.tooltipService.unRegisterTemplate(this.templateKey);
  }

  public show(hostDimension: ClientRect): void {

  }

  public hide(): void {

  }

  private setPosition(): void {

  }

  private setPositionAbove(): void {

  }

  private setPositionBelow(): void {

  }

  private setPositionRight(): void {

  }

  private setPositionleft(): void {

  }

}
