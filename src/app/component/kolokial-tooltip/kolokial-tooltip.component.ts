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

  @Input() private tooltipDisplay?: Position = KolokialTooltipPosition.Top;
  @Input() private tooltipAlignment?: Alignment = KolokialTooltipAlignment.Middle;
  @Input() private set templateKey(value: string) {
    this._key = value;
    this.tooltipService.registerTemplate(value, this);
  }

  private get templateKey(): string {
    return this._key;
  }

  private _key: string;

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

  private setPositionRight(): void{

  }

  private setPositionleft(): void{

  }

}
