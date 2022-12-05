import { Direction } from '@angular/cdk/bidi';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { field, DateControlConfig } from '../../models/form-field.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css'],
})
export class DateTimeComponent implements OnInit {
  @Input() columnConfig: field | any;
  @Input() dir: Direction = 'ltr';
  @Input() onClear = new EventEmitter();
  @Output() onSelect = new EventEmitter<any>();
  @ViewChild('rangeCalendar') private rangeCalendar: any;

  dateControlConfig: DateControlConfig | any;
  dateForm = new FormGroup({
    date: new FormControl(''),
    from: new FormControl(''),
    to: new FormControl(''),
  });
  constructor() {}

  ngOnInit(): void {
    this.dateControlConfig = this.columnConfig.control as DateControlConfig;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.onClear.subscribe((res) => {
      if (res['key'] == 'clear all') {
        this.dateForm.reset();
      }
    });
  }
  onSelectValue(key: string, value: any) {
    this.onSelect.emit({
      [key]: new Date(value).getTime(),
    });
  }

  onClearRange(key: string, option: string) {
    this.dateForm.controls[option].reset();
    this.dateForm.controls[option].updateValueAndValidity();
    this.onSelectRangeValue(key);
  }

  onSelectRangeValue(key: any) {
    const fromValue = this.dateForm.get('from')?.value
      ? this.dateForm.get('from')?.value.getTime()
      : -1;
    const toValue = this.dateForm.get('to')?.value
      ? this.dateForm.get('to')?.value.getTime()
      : -1;
    this.onSelect.emit({
      [key]: [fromValue, toValue],
    });
  }
}
