import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-filter-components',
  templateUrl: './filter-components.component.html',
  styleUrls: ['./filter-components.component.css']
})
export class FilterComponentsComponent implements OnInit, OnChanges {

  constructor() { }


  @Input() columns: any;
  @Input() cashedQuery: any;
  @Output() onFilter: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup = new FormGroup({});
  @Output() onClear = new EventEmitter();

  ngOnInit(): void {
    this.initColumns();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cashedQuery'].currentValue)
      this.initColumns();
    Object.keys(changes['cashedQuery'].currentValue).forEach(key => {
      this.form.controls[key].setValue(changes['cashedQuery'].currentValue[key])
    })
  }

  initColumns() {
    this.columns.forEach((col: any) => {
      this.form.addControl(col.control.name, new FormControl(null, [...this.prepareValidations(col)]));
      if (col.control.disabled) this.form.controls[col.control.name].disable()

    })
  }

  prepareValidations(column: any) {
    let validations = [];
    if (column.control?.required)
      validations.push(Validators.required)
    if (column.control?.minLength)
      validations.push(Validators.minLength(column.control.minLength))
    if (column.control?.maxLength)
      validations.push(Validators.maxLength(column.control.maxLength))
    if (column.control?.pattern)
      validations.push(Validators.pattern(column.control.pattern))
    return validations
  }

  filter() {
    if (this.form.valid) {
      this.onFilter.emit(this.form.value);
    }
  }

  clear() {
    this.onFilter.emit({});
    this.onClear.emit({ key: 'clear all' });
    this.form.reset();
  }
}
