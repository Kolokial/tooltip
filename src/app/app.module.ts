import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { KolokialTooltipComponent } from './component/kolokial-tooltip/kolokial-tooltip.component';
import { KolokialTooltipDirective } from './component/kolokial-tooltip/kolokial-tooltip.directive';
import { KolokialTooltipService } from './component/kolokial-tooltip/kolokial-tooltip.service';


@NgModule({
  declarations: [
    AppComponent,
    KolokialTooltipComponent,
    KolokialTooltipDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [KolokialTooltipService],
  bootstrap: [AppComponent]
})
export class AppModule { }
