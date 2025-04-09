import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhaznaTablePackageComponent } from './khazna-table-package.component';

describe('KhaznaTablePackageComponent', () => {
  let component: KhaznaTablePackageComponent;
  let fixture: ComponentFixture<KhaznaTablePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KhaznaTablePackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhaznaTablePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
