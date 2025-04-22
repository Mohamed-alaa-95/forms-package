import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { NumberOnlyDirective } from '../number-only.directive';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css'],
  
  imports: [CommonModule, InputNumberModule, ReactiveFormsModule , InputTextModule,NumberOnlyDirective]
})
export class NumberInputComponent implements OnInit, OnChanges {
  @Input() columnConfig: any;
  @Input() form: FormGroup = new FormGroup({});
  @Input() onClearFilter = new EventEmitter();
  numberRangeValuesForm: FormGroup = new FormGroup({
    from: new FormControl(null),
    to: new FormControl(null)
  });

  ngOnInit(): void {
    if (this.form?.controls[this.columnConfig?.control?.name]?.value && this.columnConfig?.control?.range) {
      const rangeValues = this.form?.controls[this.columnConfig?.control?.name]?.value.split(',')
      if (rangeValues[0] != Number.MIN_VALUE)
        this.numberRangeValuesForm.controls['from'].patchValue(rangeValues[0]);
      if (rangeValues[1] != Number.MAX_VALUE)
        this.numberRangeValuesForm.controls['to'].patchValue(rangeValues[1]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onClearFilter.subscribe((res) => {
      if (res['key'] == 'clear all') {
        this.form?.controls[this.columnConfig?.control?.name].setValue(null);
        this.numberRangeValuesForm.controls['from'].patchValue(null);
        this.numberRangeValuesForm.controls['to'].patchValue(null);
      }
    });
  }

  ngModelChange() {
    if (this.numberRangeValuesForm.controls['to'].value != null && +this.numberRangeValuesForm.controls['from'].value > +this.numberRangeValuesForm.controls['to'].value) {
      this.numberRangeValuesForm.setErrors({ invalidValues: 'Invalid values' });
      this.form.controls[this.columnConfig?.control?.name].setErrors({ invalidValues: 'Invalid values' })
    } else {
      this.form.controls[this.columnConfig?.control?.name].setErrors(null);
      if ((this.numberRangeValuesForm.controls['from'].value === Number.MIN_VALUE || this.numberRangeValuesForm.controls['from'].value == null) && (this.numberRangeValuesForm.controls['to'].value === Number.MAX_VALUE || this.numberRangeValuesForm.controls['to'].value == null)) {
        this.form.controls[this.columnConfig?.control?.name].setValue(null)
      } else {
        this.form.controls[this.columnConfig?.control?.name].setValue(`${(this.numberRangeValuesForm.controls['from'].value != null || this.numberRangeValuesForm.controls['from'].value === 0)
          ? this.numberRangeValuesForm.controls['from'].value
          : Number.MIN_VALUE
          },${(this.numberRangeValuesForm.controls['to'].value !== null || this.numberRangeValuesForm.controls['to'].value === 0)
            ? this.numberRangeValuesForm.controls['to'].value
            : Number.MAX_VALUE
          }`);
      }
    }
  }
}
