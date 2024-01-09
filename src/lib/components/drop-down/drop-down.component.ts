import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';
import { MultiSelect } from 'primeng/multiselect';
import { SelectControlConfig } from 'src/lib/models/form-field.model';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() columnConfig: any;
  @Input() dependValue: { [key: string]: any } = {};
  @Input() query: any;
  @ViewChild('dp') dropdown!: Dropdown;
  @Output() onClearSelection = new EventEmitter<any>();
  @ViewChildren('dp_multiple') dropdownMultipleComponents: QueryList<MultiSelect> | any;
  selectedItem: any

  dropDownColumnConfig: any;

  ngOnInit(): void {
    this.dropDownColumnConfig = this.columnConfig.control as SelectControlConfig;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['query'].currentValue[this.columnConfig.control.name] == undefined) {
      this.clearSingleDropDown();
      this.clearMultipleDropDown();
    }
  }

  clearSingleDropDown() {
    this.dropdown?.updateSelectedOption(null);
    this.query[this.columnConfig.control.name] = ''
  }

  clearMultipleDropDown() {
    this.dropdownMultipleComponents?.toArray()?.forEach((el: any) => {
      el.value = [];
      el.updateLabel();
      el?.hide();
    });
    this.query[this.columnConfig.control.name] = '';
  }

  onChangeDropdownSelectedValue(event: any) {
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

  updateStatus(value: any, key: any) {
    this.query[key] = value;
  }

  getSingleDropdownValue(value: any) {
    let i = this.dropDownColumnConfig.options.findIndex(
      (v: any) => value == v.id
    );
    if (i > -1) return this.dropDownColumnConfig.options[i].value;
  }


}
