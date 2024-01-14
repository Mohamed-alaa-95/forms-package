import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DateControlConfig } from 'src/lib/models/form-field.model';
@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css']
})
export class DateFieldComponent implements OnInit {
  @Input() columnConfig: any;
  @ViewChild('rangeCalendar') public rangeCalendar: any;
  @Input() form: FormGroup = new FormGroup({});
  dateForm: FormGroup = new FormGroup({
    date: new FormControl(null)
  })
  dateControlConfig: DateControlConfig | any;
  dividedRangedValues: any = {};
  ngOnInit(): void {
    this.dateControlConfig = this.columnConfig.control as DateControlConfig;
  }

  onSelectValue(key: string, value: any) {
    const date = new Date(value)?.getTime();
    this.form.controls[key].setValue(`${date}`);
  }

  onSelectRangeValue(key: any, value: any) {
    if (value) {
      if (value[1]) {
        this.rangeCalendar.overlayVisible = false;
      }
      const date = [
        value[0] ? new Date(value[0])?.getTime() : -1,
        value[1] ? new Date(value[1])?.getTime() : -1,
      ]
      this.form.controls[key].setValue(`${date}`);
    } else {
      const date = [
        -1,
        -1,
      ]
      this.form.controls[key].setValue(`${date}`);
    }
  }

  onSelectDividedFields(key: any, value: any, calendar: any) {
    this.dividedRangedValues[key] = value;
    if (value) {
      calendar.overlayVisible = false;
    }
    const date = [
      this.dividedRangedValues['from'] ? new Date(this.dividedRangedValues['from'])?.getTime() : -1,
      this.dividedRangedValues['to'] ? new Date(this.dividedRangedValues['to'])?.getTime() : -1,
    ]
    this.form.controls[key].setValue(`${date}`);
  }

  onClearRange(key: any, value: any) {
    this.dateForm.reset();
    this.onSelectRangeValue(key, value)
  }


}
