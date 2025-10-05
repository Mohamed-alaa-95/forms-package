import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberInputComponent } from '../number-input/number-input.component';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { DateFieldComponent } from '../date-field/date-field.component';
import { AutoCompleteComponent } from '../auto-complete/auto-complete.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { CommonModule } from '@angular/common';
import { BooleanDropdownComponent } from '../boolean-dropdown/boolean-dropdown.component';
import { FileInputComponent } from '../file-input/file-input.component';

@Component({
  selector: 'lib-form-container',
  imports: [
    NumberInputComponent,
    DropDownComponent,
    DateFieldComponent,
    AutoCompleteComponent,
    TextInputComponent,
    ButtonModule,
    CommonModule,
    BooleanDropdownComponent,
    FileInputComponent,
  ],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.css',
})
export class FormContainerComponent {
  dependValue: any = {};
  @Input() columns: any;
  @Input() form: FormGroup = new FormGroup({});
  @Input() filterButtonText = 'Filter';
  @Input() ClearButtonText = 'Clear';
  @Input() showFormActions = true;
  @Output() onFilter: EventEmitter<any> = new EventEmitter<{
    [key: string]: any;
  }>();
  @Output() onClear = new EventEmitter();
  @Output() onChangeDependValue: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.initColumns();
  }

  onChangeDropdown(ev: any) {
    Object.keys(ev).forEach((key) => {
      this.form.controls[key].setValue(ev[key]);
    });
  }

  initColumns() {
    this.columns?.forEach((col: any) => {
      this.form.addControl(
        col?.control?.filterKey ? col?.control?.filterKey : col?.control?.name,
        new FormControl(null, [...this.prepareValidations(col)])
      );

      if (col?.control?.disabled)
        this.form.controls[col?.control?.name].disable();
    });
  }

  prepareValidations(column: any) {
    let validations = [];
    if (column?.control?.required) validations.push(Validators.required);
    if (column?.control?.minLength)
      validations.push(Validators.minLength(column.control.minLength));
    if (column?.control?.maxLength) {
      validations.push(Validators.maxLength(column.control.maxLength));
    }
    if (column?.control?.pattern)
      validations.push(Validators.pattern(column.control.pattern));
    if (column?.control?.min)
      validations.push(Validators.min(column.control.min));
    if (column?.control?.max)
      validations.push(Validators.max(column.control.max));
    return validations;
  }

  sumbitForm() {
    this.onFilter.emit(this.form.value);
  }

  clear() {
    this.onFilter.emit({});
    this.onClear.emit({ key: 'clear all', form: this.form });
    this.form.reset();
  }
}
