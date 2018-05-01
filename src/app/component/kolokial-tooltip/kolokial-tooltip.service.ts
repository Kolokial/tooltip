import { Injectable } from '@angular/core';
import { KolokialTooltipComponent } from './kolokial-tooltip.component';

@Injectable()
export class KolokialTooltipService {

  private availableTemplates: Map<string, KolokialTooltipComponent> = new Map<string, KolokialTooltipComponent>();

  constructor() { }

  public registerTemplate(templateKey: string, tooltipComponent: KolokialTooltipComponent): void {
    if (this.availableTemplates.has(templateKey)) {
      console.error(`The template key ${templateKey} is already in use! You cannot register the template with this key.`);
    } else {
      this.availableTemplates.set(templateKey, tooltipComponent);
    }
  }

  public unRegisterTemplate(templateKey): void {
    if (this.availableTemplates.has(templateKey)) {
      this.availableTemplates.delete(templateKey);
    } else {
      console.error(`The template ${templateKey} does not exist. Nothing to unregister!`);
    }
  }

  public showTooltip(templateKey: string, hostPosition: ClientRect): void {
    if (this.availableTemplates.has(templateKey)) {
      this.availableTemplates.get(templateKey).show(hostPosition);
    } else {
      console.error(`The template ${templateKey} does not exist. Nothing to show!`);
    }
  }

  public hideTooltip(templateKey): void {
    if (this.availableTemplates.has(templateKey)) {
      this.availableTemplates.get(templateKey).hide();
    } else {
      console.error(`The template ${templateKey} does not exist. Nothing to hide!`);
    }
  }

}
