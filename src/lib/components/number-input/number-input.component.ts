import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NumberControlConfig, field } from 'src/lib/models/form-field.model';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css']
})
export class NumberInputComponent implements OnInit {
  @Input() columnConfig: field | any;
  @Input() form: FormGroup;
  numberColumnConfig: NumberControlConfig | any;
  numberRangeValues = { from: '', to: '' };
  ngOnInit(): void {
    this.numberColumnConfig = this.columnConfig.control as NumberControlConfig;
  }


  ngModelChange() {
    this.form.controls[this.numberColumnConfig.name].setValue(`${this.numberRangeValues.from
      ? this.numberRangeValues.from
      : Number.MIN_VALUE
      },${this.numberRangeValues.to
        ? this.numberRangeValues.to
        : Number.MAX_VALUE
      }`);
  }
}
