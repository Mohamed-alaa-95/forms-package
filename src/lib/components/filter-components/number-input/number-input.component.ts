import { Component, Input, OnInit } from '@angular/core';
import { NumberControlConfig } from '@khaznatech/export-package/lib/column.model';
import { field } from '@khaznatech/khazna-elements-package/lib/models/form-field.model';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css']
})
export class NumberInputComponent implements OnInit {
  @Input() columnConfig: field | any;
  @Input() query;
  numberColumnConfig: NumberControlConfig | any;
  numberRangeValues = { from: '', to: '' };
  ngOnInit(): void {
    this.numberColumnConfig = this.columnConfig.control as NumberControlConfig;
  }
  constructor() { }

  ngModelChange() {
    this.query[this.columnConfig.control.name] = `${this.numberRangeValues.from
      ? this.numberRangeValues.from
      : Number.MIN_VALUE
      },${this.numberRangeValues.to
        ? this.numberRangeValues.to
        : Number.MAX_VALUE
      }`;
  }
}
