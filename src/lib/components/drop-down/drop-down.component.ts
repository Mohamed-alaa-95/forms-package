import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';
import { MultiSelect } from 'primeng/multiselect';
import { SelectControlConfig } from 'src/lib/models/form-field.model';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

  constructor() { }
  @Input() columnConfig: any;
  @Input() dependValue: { [key: string]: any } = {};
  @ViewChild('dp') dropdown!: Dropdown;
  @Output() onClearSelection = new EventEmitter<any>();
  @ViewChildren('dp_multiple') dropdownMultipleComponents: QueryList<MultiSelect> | any;
  @Input() form: FormGroup = new FormGroup({});;
  selectedItem: any
  dropDownColumnConfig: any;

  ngOnInit(): void {
    this.dropDownColumnConfig = this.columnConfig.control as SelectControlConfig;
  }

  onChangeDropdownSelectedValue(event: any) {
    this.form.controls[this.columnConfig.control.name].setValue(event.value);
  }

  getValue(selectedValues: any) {
    return this.dropDownColumnConfig.options
      .filter((v: any) => {
        return selectedValues.indexOf(v[this.columnConfig.control.optionValue]) > -1;
      })
      .map((el: any) => el[this.columnConfig.control.optionLabel])
      .join(',');
  }

  updateStatus(value: any, key: any) {
    this.form.controls[this.columnConfig.control.name].setValue(value);
  }

  getSingleDropdownValue(value: any) {
    let i = this.dropDownColumnConfig.options.findIndex(
      (v: any) => value == v[this.columnConfig.control.optionValue]
    );
    if (i > -1) return this.dropDownColumnConfig.options[i][this.columnConfig.control.optionValue]
  }


}
