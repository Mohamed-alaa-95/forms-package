import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { field } from 'src/lib/models/form-field.model';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  constructor() { }
  @Input() columnConfig: field;
  @Input() form: FormGroup;
  @Input() onClearFilter = new EventEmitter();
  checkboxChecked: boolean = false


  ngOnInit(): void {
    if (this.form?.controls[this.columnConfig?.control?.name]?.value) {
      this.checkboxChecked = this.form.controls[this.columnConfig.control.name].value
    }
  }
  onChangeCheckBox(event: any) {
    this.form.controls[this.columnConfig.control.name].setValue(event.checked);
  }


  ngOnChanges(): void {
    this.onClearFilter.subscribe((res) => {
      if (res['key'] == 'clear all') {
        this.checkboxChecked = false;
         this.form.controls[this.columnConfig.control.name].setValue(null);
      }
    });
  }
}
