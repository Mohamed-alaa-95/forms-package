import { Direction } from '@angular/cdk/bidi';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateControlConfig, field } from '../../models/form-field.model';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent implements OnInit, OnChanges {
  @Input() columnConfig: field | any;
  @Input() dir: Direction = "ltr"
  @Input() onClear = new EventEmitter();
  @Output() onSelect = new EventEmitter<any>();
  @ViewChild('rangeCalendar') private rangeCalendar: any;

  dateControlConfig: DateControlConfig | any;
  dateForm = new FormGroup({
    date: new FormControl(null),
  });

  constructor() { }

  ngOnInit(): void {
    this.dateControlConfig = this.columnConfig.control as DateControlConfig;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.onClear.subscribe((res) => {
      if (res['key'] == 'clear all') {
        this.dateForm.get('date')?.setValue(null);
      }
    });
  }
  onSelectValue(key: string, value: any) {
    this.onSelect.emit({
      [key]: new Date(value).getTime(),
    });
  }

  onClearRange(key: any, value: any) {
    this.dateForm.get('date')?.setValue(null)
    this.onSelectRangeValue(key, value)

  }

  onSelectRangeValue(key: any, value: any) {
    if (value) {
      if (value[1]) {
        this.rangeCalendar.overlayVisible = false;
      }
      this.onSelect.emit({
        [key]: [
          value[0] ? new Date(value[0]).getTime() : -1,
          value[1] ? new Date(value[1]).getTime() : -1,
        ],
      });
    } else {
      this.onSelect.emit({
        [key]: [
          -1,
          -1,
        ],
      });
    }
  }
}
