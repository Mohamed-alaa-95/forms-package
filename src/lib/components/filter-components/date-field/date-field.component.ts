import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DateControlConfig } from '@khaznatech/export-package/lib/column.model';
import { field } from '@khaznatech/khazna-elements-package/lib/models/form-field.model';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css']
})
export class DateFieldComponent implements OnInit {

  @Input() columnConfig: field | any;
  @ViewChild('rangeCalendar') public rangeCalendar: any;
  @Input() query;
  dateValues;
  dateControlConfig: DateControlConfig | any;
  ngOnInit(): void {
    this.dateControlConfig = this.columnConfig.control as DateControlConfig;
    console.log(this.dateControlConfig);

  }

  onSelectValue(key: string, value: any) {
    const date = new Date(value).getTime();
    this.query[key] = date;
  }

  onSelectRangeValue(key: any, value: any) {
    if (value) {
      if (value[1]) {
        this.rangeCalendar.overlayVisible = false;
      }
      const date = [
        value[0] ? new Date(value[0]).getTime() : -1,
        value[1] ? new Date(value[1]).getTime() : -1,
      ]
      this.query[key] = date;
    } else {
      const date = [
        -1,
        -1,
      ]
      console.log(date);

      this.query[key] = date;
    }
  }

  onClearRange(key: any, value: any) {
    this.dateValues = null;
    this.onSelectRangeValue(key, value)

  }


}
