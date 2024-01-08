import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DateControlConfig } from 'src/lib/models/form-field.model';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css']
})
export class DateFieldComponent implements OnInit, OnChanges {

  @Input() columnConfig: any;
  @ViewChild('rangeCalendar') public rangeCalendar: any;
  @Input() query: any;
  dateValues: any;
  dateControlConfig: DateControlConfig | any;
  ngOnInit(): void {
    this.dateControlConfig = this.columnConfig.control as DateControlConfig;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['query'].currentValue[this.columnConfig.control.name] == undefined) {
      this.dateValues = null;
      if (this.columnConfig.control.range)
        this.onSelectRangeValue(this.columnConfig.control.name, null)
    }
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
      this.query[key] = date;
    }
  }

  onClearRange(key: any, value: any) {
    this.dateValues = null;
    this.onSelectRangeValue(key, value)
  }


}
