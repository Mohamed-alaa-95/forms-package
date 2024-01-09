import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponentsComponent } from './filter-components.component';

describe('FilterComponentsComponent', () => {
  let component: FilterComponentsComponent;
  let fixture: ComponentFixture<FilterComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
