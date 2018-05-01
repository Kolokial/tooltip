import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { KolokialTooltipComponent } from './component/kolokial-tooltip/kolokial-tooltip.component';
import { KolokialTooltipDirective } from './component/kolokial-tooltip/kolokial-tooltip.directive';


@NgModule({
  declarations: [
    AppComponent,
    KolokialTooltipComponent,
    KolokialTooltipDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
