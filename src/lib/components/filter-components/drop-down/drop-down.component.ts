import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SelectControlConfig } from '@khaznatech/export-package/lib/column.model';
import { field } from '@khaznatech/khazna-elements-package/lib/models/form-field.model';
import { Dropdown } from 'primeng/dropdown';
import { MultiSelect } from 'primeng/multiselect';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

  constructor() { }
  @Input() columnConfig: field | any;
  @Input() dependValue: { [key: string]: any } = {};
  @Input() query;
  @ViewChild('dp') dropdown!: Dropdown;
  @ViewChildren('dp_multiple')
  dropdownMultipleComponents: QueryList<MultiSelect> | any;

  dropDownColumnConfig: SelectControlConfig | any;

  ngOnInit(): void {
    this.dropDownColumnConfig = this.columnConfig.control as SelectControlConfig;
  }

  clearSingleDropDown() {
    this.dropdown.updateSelectedOption(null);
    this.query[this.columnConfig.control.name] = ''
  }

  clearMultipleDropDown() {
    this.dropdownMultipleComponents.toArray().forEach((el: any) => {
      el.value = [];
      el.updateLabel();
      el.hide();
    });
    this.query[this.columnConfig.control.name] = '';
  }

  onChangeDropdownSelectedValue(event) {
    this.query[this.columnConfig.control.name] = event.value;
  }

  getValue(selectedValues: any) {
    return this.dropDownColumnConfig.options
      .filter((v: any) => {
        return selectedValues.indexOf(v.id) > -1;
      })
      .map((el: any) => el.value)
      .join(',');
  }

}
