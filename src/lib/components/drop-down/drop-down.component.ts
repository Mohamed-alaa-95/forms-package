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
export class DropDownComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() columnConfig: any;
  @Input() dependValue: { [key: string]: any } = {};
  @ViewChild('dp') dropdown!: Dropdown;
  @ViewChildren('dp_multiple') dropdownMultipleComponents: QueryList<MultiSelect> | any;
  @Input() form: FormGroup = new FormGroup({});
  @Output() onSelect = new EventEmitter<any>();
  @Input() onClear = new EventEmitter();

  dropDownColumnConfig: any;

  ngOnInit(): void {
    this.dropDownColumnConfig = this.columnConfig.control as SelectControlConfig;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onClear.subscribe((res) => {
      if (res['key'] != 'clear all') {
        if (this.columnConfig.control.name == res['key']) {
          this.clearSingleDropDown();
          this.clearMultipleDropDown();
          return;
        }
      } else {
        this.clearSingleDropDown();
        this.clearMultipleDropDown();
        return;
      }
    });

  }

  onChangeDropdownSelectedValue(event: any) {
    this.onSelect.emit({ [this.columnConfig.control.name]: event?.value?.length ? event?.value : [] });
  }

  getValue(selectedValues: any) {
    return this.dropDownColumnConfig.options
      .filter((v: any) => {
        return selectedValues.indexOf(v[this.columnConfig.control.optionValue ? this.columnConfig.control.optionValue : 'name']) > -1;
      })
      .map((el: any) => el[this.dropDownColumnConfig.optionLabel ? this.dropDownColumnConfig.optionLabel : 'name'])
      .join(',');
  }

  updateStatus(value: any) {
    this.onSelect.emit({ [this.columnConfig.control.name]: value });
  }

  getSingleDropdownValue(value: any) {
    let i = this.dropDownColumnConfig.options.findIndex(
      (v: any) => value == v[this.columnConfig.control.optionValue ? this.columnConfig.control.optionValue : 'name']
    );
    if (i > -1) return this.dropDownColumnConfig.options[i][this.columnConfig.control.optionValue ? this.columnConfig.control.optionValue : 'name']
  }

  clearSingleDropDown() {
    if (this.dropdown) {
      this.dropdown.updateSelectedOption(null)
    }
  }

  clearMultipleDropDown() {
    if (this.dropdownMultipleComponents) {
      this.dropdownMultipleComponents.toArray().forEach((el: any) => {
        el.value = [];
        el.updateLabel();
        el.hide();
      });
    }
  }
}
