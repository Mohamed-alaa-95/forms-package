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
  styleUrls: ['./date-field.component.css'],

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

  ngOnInit(): void {
    if (this.form?.controls[this.columnConfig?.control?.name]?.value) {
      this.dateForm.controls['date'].setValue(
        new Date(+this.form?.controls[this.columnConfig?.control?.name]?.value)
      );
    }
  }

  ngOnChanges(): void {
    this.onClearFilter.subscribe((res) => {
      if (res['key'] == 'clear all') {
        this.dateForm.get('date')?.setValue(null);
      }
    });
  }

  onSelectRangeValue(key: any, value: any) {
    console.log(value);
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
          formattedDates[0] = -1;
        }
        
        // Handle end date
        if (value[1]) {
          const endDate = new Date(value[1]);
          const endYear = endDate.getFullYear();
          const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
          const endDay = String(endDate.getDate()).padStart(2, '0');
          
          // If start and end dates are the same, add time to end (similar to your current logic)
          if (value[0] && value[0].getTime() === value[1].getTime()) {
            // Add a day in the formatted string instead of milliseconds
            const nextDay = new Date(endDate);
            nextDay.setDate(nextDay.getDate() + 1);
            const nextYear = nextDay.getFullYear();
            const nextMonth = String(nextDay.getMonth() + 1).padStart(2, '0');
            const nextDayStr = String(nextDay.getDate()).padStart(2, '0');
            formattedDates[1] = `${nextYear}-${nextMonth}-${nextDayStr}`;
          } else {
            formattedDates[1] = `${endYear}-${endMonth}-${endDay}`;
          }
        } else {
          formattedDates[1] = -1;
        }
        console.log(formattedDates);
        
        this.form.controls[key].setValue(formattedDates);
      } else {
        this.form.controls[key].setValue(null);
      }
    } else {
      // Single date logic (unchanged)
      if (value) {
        const inputDate = new Date(value);
        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const day = String(inputDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        console.log('formattedDate', formattedDate);
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
}
