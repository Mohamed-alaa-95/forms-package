import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DateControlConfig } from 'src/lib/models/form-field.model';
@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css']
})
export class DateFieldComponent implements OnInit, OnChanges {
  @Input() columnConfig: any;
  @ViewChild('rangeCalendar') public rangeCalendar: any;
  @Input() form: FormGroup = new FormGroup({});
  @Input() onClearFilter = new EventEmitter();
  defaultDate: Date = new Date(new Date().setHours(0, 0, 0, 0))
  dateForm: FormGroup = new FormGroup({
    date: new FormControl(null)
  })
  dateControlConfig: DateControlConfig | any;
  dividedRangedValues: any = {};
  ngOnInit(): void {
    this.dateControlConfig = this.columnConfig.control as DateControlConfig;

    if (this.form?.controls[this.dateControlConfig?.name]?.value) {
      if (this.dateControlConfig.divided) {
        const dividedValues = this.form?.controls[this.dateControlConfig?.name]?.value.split(',')
        if (+dividedValues[0] != -1)
          this.dividedRangedValues.from = new Date(+dividedValues[0]);
        if (+dividedValues[1] != -1)
          this.dividedRangedValues.to = new Date(+dividedValues[1]);
      }
      if (this.dateControlConfig.range) {
        const dividedValues = this.form?.controls[this.dateControlConfig?.name]?.value.split(',')
        this.dateForm.controls['date'].setValue([+dividedValues[0] != -1 ? new Date(+dividedValues[0]) : null, dividedValues[1] != -1 ? new Date(+dividedValues[1]) : null])
      } else this.dateForm.controls['date'].setValue(this.form?.controls[this.dateControlConfig?.name]?.value ? new Date(+this.form?.controls[this.dateControlConfig?.name]?.value) : null)
    }
  }

  ngOnChanges(): void {
    this.onClearFilter.subscribe((res) => {
      if (res['key'] == 'clear all') {
        this.dateForm.get('date')?.setValue(null);
        this.dividedRangedValues = {};
      }
    });
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
        value[1] ? value[0]?.getTime() === value[1]?.getTime() ? new Date(new Date(value[1]))?.getTime() + 86399000 : new Date(value[1])?.getTime() : -1,
      ]
      this.form.controls[key].setValue(`${date}`);
    } else {
      this.form.controls[key].setValue(null);
    }
  }

  onSelectDividedFields() {
    let date: any = [
      this.dividedRangedValues['from'] ? new Date(this.dividedRangedValues['from'])?.getTime() : -1,
      this.dividedRangedValues['to'] ? this.dividedRangedValues['to']?.getTime() === this.dividedRangedValues['from']?.getTime() && !this.dateControlConfig.view ? new Date(this.dividedRangedValues['to'])?.getTime() + 59000 : new Date(this.dividedRangedValues['to'])?.getTime() : -1,
    ]
    if (this.dividedRangedValues['from']?.getMinutes() == 0 && this.dividedRangedValues['to']?.getMinutes() == 0
      && this.dividedRangedValues['from']?.getHours() == 0 && this.dividedRangedValues['to']?.getHours() == 0 && !this.dateControlConfig.view)
      date[1] = new Date(this.dividedRangedValues['to'])?.getTime() + 86399000
    this.form.controls[this.columnConfig.control.name].setValue(`${date}`);
  }

  onClearRange(key: any, value: any) {
    this.dateForm.reset();
    this.onSelectRangeValue(key, value)
  }
}
