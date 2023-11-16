import { Direction } from '@angular/cdk/bidi';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { field } from '../../models/form-field.model';
@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.scss'],
})
export class InputFilterComponent implements OnChanges {
  @Input() columnConfig: field | any;
  @Input() dir: Direction = 'ltr';
  @Input() onClear = new EventEmitter();
  @Output() onChange = new EventEmitter<any>();
  @Input() queryParams!: { [key: string]: any };

  inputForm = new FormGroup({
    inputField: new FormControl(null),
  });
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.onClear.subscribe((res) => {
      if (res['key'] == 'clear all') {
        this.inputForm.reset();
      }
    });
    if (this.queryParams && this.queryParams[this.columnConfig.control.name])
      this.inputForm.patchValue({
        inputField: this.queryParams[this.columnConfig.control.name],
      });
  }
  onChangeInputValue(key: string, ev: any) {
    this.onChange.emit({
      [key]: ev.target.value,
    });
  }
}
