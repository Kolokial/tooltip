import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KolokialTooltipComponent } from './kolokial-tooltip.component';

describe('KolokialTooltipComponent', () => {
  let component: KolokialTooltipComponent;
  let fixture: ComponentFixture<KolokialTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KolokialTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KolokialTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
