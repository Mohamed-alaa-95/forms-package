import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanDropdownComponent } from './boolean-dropdown.component';

describe('BooleanDropdownComponent', () => {
  let component: BooleanDropdownComponent;
  let fixture: ComponentFixture<BooleanDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooleanDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooleanDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
