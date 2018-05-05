import { Directive, ElementRef, Renderer2, Input, OnDestroy } from '@angular/core';
import { KolokialTooltipService } from './kolokial-tooltip.service';

@Directive({
  selector: '[appKolokialTooltip]'
})
export class KolokialTooltipDirective implements OnDestroy {

  @Input('appKolokialTooltip') appKolokialTooltip: string;

  private onMouseEnterDestroy: () => void;
  private onMouseLeaveDestroy: () => void;

  constructor(private renderer: Renderer2, private hostElement: ElementRef, private tooltipService: KolokialTooltipService) {
    this.onMouseEnter();
    this.onMouseLeave();
  }

  public ngOnDestroy(): void {
    if (this.onMouseEnterDestroy && this.onMouseLeaveDestroy) {
      this.onMouseEnterDestroy();
      this.onMouseLeaveDestroy();
    }
  }

  private onMouseEnter(): void {
    this.onMouseEnterDestroy = this.renderer.listen(this.hostElement.nativeElement, 'mouseenter', () => {
      const hostPosition: ClientRect = this.hostElement.nativeElement.getBoundingClientRect();
      this.tooltipService.showTooltip(this.appKolokialTooltip, hostPosition);
    });
  }

  private onMouseLeave(): void {
    this.onMouseLeaveDestroy = this.renderer.listen(this.hostElement.nativeElement, 'mouseleave', () => {
      this.tooltipService.hideTooltip(this.appKolokialTooltip);
    });
  }

}
