import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhaznaKsaTableComponent } from './khazna-ksa-table.component';

describe('KhaznaKsaTableComponent', () => {
  let component: KhaznaKsaTableComponent;
  let fixture: ComponentFixture<KhaznaKsaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KhaznaKsaTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhaznaKsaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
