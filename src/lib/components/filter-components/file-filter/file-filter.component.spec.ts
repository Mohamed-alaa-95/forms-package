import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFilterComponent } from './file-filter.component';

describe('FileFilterComponent', () => {
  let component: FileFilterComponent;
  let fixture: ComponentFixture<FileFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
