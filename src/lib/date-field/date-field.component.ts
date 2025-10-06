import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],

  imports: [CommonModule, DatePickerModule, ReactiveFormsModule, FormsModule],
})
export class DateFieldComponent implements OnInit, OnChanges {
  @ViewChild('rangeCalendar') public rangeCalendar: any;
  @Input() columnConfig: any;
  @Input() form: FormGroup = new FormGroup({});
  @Input() onClearFilter = new EventEmitter();
  defaultDate: Date = new Date(new Date().setHours(0, 0, 0, 0));
  dateForm: FormGroup = new FormGroup({
    date: new FormControl(null),
  });
  dividedRangedValues: any = {};

  ngOnInit(): void {
    if (this.form?.controls[this.columnConfig?.control?.name]?.value) {
      if (this.columnConfig?.control?.range) {
        const dateValue =
          this.form?.controls[this.columnConfig?.control?.name]?.value;

        if (Array.isArray(dateValue) && dateValue.length === 2) {
          const startDate = new Date(dateValue[0]);
          let endDate = null;
          if (dateValue[0] !== '-1') endDate = new Date(dateValue[1]);

          this.dateForm.controls['date'].setValue([startDate, endDate]);
        }
      } else {
        const dateValue =
          this.form?.controls[this.columnConfig?.control?.name]?.value;
        if (dateValue) {
          const inputDate = new Date(dateValue);
          this.dateForm.controls['date'].setValue(inputDate);
        }
      }
    }
  }

  ngOnChanges(): void {
    this.onClearFilter.subscribe((res) => {
      if (res['key'] == 'clear all') {
        this.dateForm.get('date')?.setValue(null);
        this.dividedRangedValues = {};
        if (this.rangeCalendar) {
          this.rangeCalendar.overlayVisible = false;
        }
      }
    });
  }

  onSelectRangeValue(key: any, value: any) {
    if (this.columnConfig.control?.range) {
      if (value && Array.isArray(value)) {
        const formattedDates = [];

        // Handle start date
        if (value[0]) {
          const startDate = new Date(value[0]);
          const startYear = startDate.getFullYear();
          const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
          const startDay = String(startDate.getDate()).padStart(2, '0');
          formattedDates[0] = `${startYear}-${startMonth}-${startDay}`;
        } else {
          formattedDates[0] = '-1';
        }

        // Handle end date
        if (value[1]) {
          const endDate = new Date(value[1]);
          const endYear = endDate.getFullYear();
          const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
          const endDay = String(endDate.getDate()).padStart(2, '0');

          // Use the exact same date instead of adding a day
          formattedDates[1] = `${endYear}-${endMonth}-${endDay}`;
        } else {
          formattedDates[1] = '-1';
        }

        this.form.controls[key].setValue(formattedDates);
      } else {
        this.form.controls[key].setValue(null);
      }
    } else {
      if (value) {
        const inputDate = new Date(value);
        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const day = String(inputDate.getDate()).padStart(2, '0');
        let formattedDate;
        this.columnConfig.control?.view &&
        this.columnConfig.control?.view === 'month'
          ? (formattedDate = `${year}-${month}`)
          : (formattedDate = `${year}-${month}-${day}`);
        this.form.controls[key].setValue(`${formattedDate}`);
      } else {
        this.form.controls[key].setValue(null);
      }
    }
  }

  onClearRange(key: any, value: any) {
    this.dateForm.reset();
    this.onSelectRangeValue(key, value);
  }

  onSelectDividedFields() {
    const fromValue = this.dividedRangedValues['from'];
    const toValue = this.dividedRangedValues['to'];

    if (fromValue || toValue) {
      const formattedDates = [];

      // Handle start date
      if (fromValue) {
        const startDate = new Date(fromValue);
        const startYear = startDate.getFullYear();
        const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
        const startDay = String(startDate.getDate()).padStart(2, '0');
        formattedDates[0] = `${startYear}-${startMonth}-${startDay}`;
      } else formattedDates[0] = '-1';

      // Handle end date
      if (toValue) {
        const endDate = new Date(toValue);
        const endYear = endDate.getFullYear();
        const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
        const endDay = String(endDate.getDate()).padStart(2, '0');
        formattedDates[1] = `${endYear}-${endMonth}-${endDay}`;
      } else formattedDates[1] = '-1';

      this.form.controls[this.columnConfig.control.name].setValue(
        formattedDates
      );
    } else this.form.controls[this.columnConfig.control.name].setValue(null);
  }
}
