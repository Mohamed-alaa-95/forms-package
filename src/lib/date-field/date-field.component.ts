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

  onClearRange(key: any, value: any) {
    this.dateForm.reset();
    this.onSelectRangeValue(key, value);
  }
}
