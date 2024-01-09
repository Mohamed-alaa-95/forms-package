import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NumberControlConfig, field } from 'src/lib/models/form-field.model';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css']
})
export class NumberInputComponent implements OnInit, OnChanges {
  @Input() columnConfig: field | any;
  @Input() query: any;
  numberColumnConfig: NumberControlConfig | any;
  numberRangeValues = { from: '', to: '' };
  ngOnInit(): void {
    this.numberColumnConfig = this.columnConfig.control as NumberControlConfig;
  }
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['query'].currentValue[this.columnConfig.control.name] == undefined) {
      if (this.columnConfig.control.range) {
        this.numberRangeValues.from = null;
        this.numberRangeValues.to = null;
      } else this.query[this.columnConfig.control.name] = null;
    }
  }

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
