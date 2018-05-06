import {
  Directive, ElementRef, Renderer2, Input, OnDestroy, ComponentFactoryResolver,
  ComponentRef, ComponentFactory, ViewContainerRef
} from '@angular/core';
import { KolokialTooltipService } from './kolokial-tooltip.service';
import { KolokialTooltipPosition, KolokialTooltipAlignment } from './kolokial-tooltip.enum';
import { KolokialTooltipComponent } from './kolokial-tooltip.component';

type Alignment = KolokialTooltipAlignment;
type Position = KolokialTooltipPosition;

@Directive({
  selector: '[appKolokialTooltip]'
})
export class KolokialTooltipDirective implements OnDestroy {

  private _position: Position = KolokialTooltipPosition.Top;
  private _alignment: Alignment = KolokialTooltipAlignment.Middle;
  private _key: string;
  private _text: string;

  private onMouseEnterDestroy: () => void;
  private onMouseLeaveDestroy: () => void;

  private alignments = KolokialTooltipAlignment;
  private positions = KolokialTooltipPosition;
  private tooltipComponent: ComponentRef<KolokialTooltipComponent>;

  @Input('appKolokialTooltip') set appKolokialTooltip(value: string) {
    this._text = value;
    this.tooltipComponent.instance.text = this._text;
  }

  @Input() private set position(value: 'top' | 'right' | 'bottom' | 'left') {
    switch (value) {
      case 'right': this._position = KolokialTooltipPosition.Right; break;
      case 'bottom': this._position = KolokialTooltipPosition.Bottom; break;
      case 'left': this._position = KolokialTooltipPosition.Left; break;
      case 'top':
      default: this._position = KolokialTooltipPosition.Top; break;
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

  @Input() templateKey(key: string) {
    this._key = key;
    this.tooltipComponent.destroy();
  }

  constructor(
    private renderer: Renderer2,
    private hostElement: ElementRef,
    private container: ViewContainerRef,
    private tooltipService: KolokialTooltipService,
    private resolver: ComponentFactoryResolver) {
    this.onMouseEnter();
    this.onMouseLeave();
    this.createComponent();
  }

  public ngOnDestroy(): void {
    if (this.onMouseEnterDestroy && this.onMouseLeaveDestroy) {
      this.onMouseEnterDestroy();
      this.onMouseLeaveDestroy();
    }

    if (this.tooltipComponent) {
      this.tooltipComponent.destroy();
    }
  }

  private onMouseEnter(): void {
    this.onMouseEnterDestroy = this.renderer.listen(this.hostElement.nativeElement, 'mouseenter', () => {
      const hostPosition: ClientRect = this.hostElement.nativeElement.getBoundingClientRect();
      this.showTooltip(hostPosition);
    });
  }

  private onMouseLeave(): void {
    this.onMouseLeaveDestroy = this.renderer.listen(this.hostElement.nativeElement, 'mouseleave', () => {
      this.hideTooltip();
    });
  }

  private createComponent(): void {
    const factory: ComponentFactory<KolokialTooltipComponent> = this.resolver.resolveComponentFactory(KolokialTooltipComponent);
    this.tooltipComponent = this.container.createComponent(factory);
  }

  private showTooltip(hostPosition): void {
    if (this._key) {
      this.tooltipService.showTooltip(this._key, hostPosition);
    } else {
      this.tooltipComponent.instance.show(hostPosition);
    }
  }

  private hideTooltip(): void {
    if (this._key) {
      this.tooltipService.hideTooltip(this._key);
    } else {
      this.tooltipComponent.instance.hide();
    }
  }

}
