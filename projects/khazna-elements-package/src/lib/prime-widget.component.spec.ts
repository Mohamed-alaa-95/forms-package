import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeWidgetComponent } from './prime-widget.component';

describe('PrimeWidgetComponent', () => {
  let component: PrimeWidgetComponent;
  let fixture: ComponentFixture<PrimeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
