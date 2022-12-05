import { Direction } from '@angular/cdk/bidi';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { field, NumberControlConfig } from '../../models/form-field.model';

@Component({
  selector: 'app-number-filter',
  templateUrl: './number-filter.component.html',
  styleUrls: ['./number-filter.component.scss'],
})
export class NumberFilterComponent implements OnInit, OnChanges {
  @Input() columnConfig: field | any;
  @Input() dependValu: any;
  @Input() dir: Direction = 'ltr';
  @Input() onClear = new EventEmitter();
  @Input() queryParams!: { [key: string]: any };
  @Output() onChange = new EventEmitter<any>();
  numberColumnConfig: NumberControlConfig | any;

  inputForm = new FormGroup({
    from: new FormControl(null),
    to: new FormControl(null),
  });
  constructor() {}

  ngOnInit(): void {
    this.numberColumnConfig = this.columnConfig.control as NumberControlConfig;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onClear.subscribe((res) => {
      if (res['key'] == 'clear all') {
        this.inputForm.reset();
      }
    });
    if (this.queryParams && Object.keys(this.queryParams).length) {
      this.inputForm.patchValue({
        from: this.queryParams[this.columnConfig.control.name],
        to: this.queryParams[this.columnConfig.control.name],
      });
    }
  }

  onChangeSingleInputValue(key: string, ev: any) {
    this.onChange.emit({
      [key]: ev.target.value,
    });
  }
  onChangeInputValue(key: string) {
    const fromValue =
      this.inputForm.get('from')?.value ||
      this.inputForm.get('from')?.value === 0
        ? this.inputForm.get('from')?.value
        : -1;
    const toValue =
      this.inputForm.get('to')?.value || this.inputForm.get('to')?.value === 0
        ? this.inputForm.get('to')?.value
        : -1;
    this.onChange.emit({
      [key]: [fromValue, toValue],
    });
  }
  preventNegativeSign(event: any) {
    console.log(event);
    window.alert(event.charCode);
    return event.charCode == 8 || event.charCode == 0
      ? null
      : (event.charCode >= 48 && event.charCode <= 57) || event.charCode >= 46;
  }
}
