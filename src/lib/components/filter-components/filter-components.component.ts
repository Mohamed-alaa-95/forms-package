import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-filter-components',
  templateUrl: './filter-components.component.html',
  styleUrls: ['./filter-components.component.css'],
})
export class FilterComponentsComponent implements OnInit, OnChanges {
  dependValue: any = {};

  constructor() {}

  @Input() columns: any;
  @Input() cashedQuery: { [key: string]: any };
  @Output() onFilter: EventEmitter<any> = new EventEmitter<{
    [key: string]: any;
  }>();
  form: FormGroup = new FormGroup({});
  @Output() onClear = new EventEmitter();
  @Output() onChangeDependValue: EventEmitter<any> = new EventEmitter<any>();
  @Input() filterButtonText = 'Filter';
  @Input() ClearButtonText = 'Clear';

  ngOnInit(): void {
    this.initColumns();
  }

  onChangeDropdown(ev: any) {
    Object.keys(ev).forEach((key) => {
      this.form.controls[key].setValue(ev[key]);
      this.columns
        ?.filter((col: any) => col.control.depends === key)
        .forEach((col: any) => {
          if (col.control.depends) {
            this.dependValue[col.control.depends] = ev[key];
            if (ev[key]?.length) {
              this.onChangeDependValue.emit({
                column: col,
                value: ev ? ev[col.control.depends] : null,
              });
            } else {
              this.onClear.emit({ key: col.control.name });
              this.form.controls[col.control.name].setValue([]);
              this.form.controls[col.control.depends].setValue([]);
              this.dependValue[col.control.depends] = null;
              this.dependValue[col.control.name] = null;
            }
          }
        });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cashedQuery']?.currentValue) {
      this.initColumns();
      Object.keys(changes['cashedQuery']?.currentValue)?.forEach((key) => {
        this.form.controls[key]?.setValue(
          changes['cashedQuery']?.currentValue[key]
        );
      });
    }
  }

  initColumns() {
    this.columns.forEach((col: any) => {
      this.form.addControl(
        col.control.name,
        new FormControl(null, [...this.prepareValidations(col)])
      );
      if (col.control.disabled) this.form.controls[col.control.name].disable();
    });
  }

  prepareValidations(column: any) {
    let validations = [];
    if (column.control?.required) validations.push(Validators.required);
    if (column.control?.minLength)
      validations.push(Validators.minLength(column.control.minLength));
    if (column.control?.maxLength)
      validations.push(Validators.maxLength(column.control.maxLength));
    if (column.control?.pattern)
      validations.push(Validators.pattern(column.control.pattern));
    return validations;
  }

  filter() {
    if (this.form.valid) {
      this.onFilter.emit(this.form.value);
    }
  }

  clear() {
    this.onFilter.emit({});
    this.onClear.emit({ key: 'clear all' });
    this.dependValue = {};
    this.form.reset();
  }
}
