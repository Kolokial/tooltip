import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
import { KolokialTooltipService } from './kolokial-tooltip.service';

@Directive({
  selector: '[appKolokialTooltip]'
})
export class KolokialTooltipDirective {

  @Input('appKolokialTooltip') appKolokialTooltip: string;

  private onMouseEnterDestory: () => void;

  constructor(private renderer: Renderer2, private hostElement: ElementRef, private tooltipService: KolokialTooltipService) {
    this.onMouseEnter();
  }

  private onMouseEnter(): void {
    this.onMouseEnterDestory = this.renderer.listen(this.hostElement.nativeElement, 'mouseenter', () => {
      const hostPosition: ClientRect = this.hostElement.nativeElement.getBoundingRect();
      this.tooltipService.showTooltip(this.appKolokialTooltip, hostPosition);
    });
  }

}
