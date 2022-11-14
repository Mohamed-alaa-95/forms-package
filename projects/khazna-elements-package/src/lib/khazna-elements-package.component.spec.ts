import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhaznaElemetnsPackageComponent } from './khazna-elements-package.component';

describe('KhaznaElemetnsPackageComponent', () => {
  let component: KhaznaElemetnsPackageComponent;
  let fixture: ComponentFixture<KhaznaElemetnsPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhaznaElemetnsPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhaznaElemetnsPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
