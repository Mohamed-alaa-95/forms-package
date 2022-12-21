import { Direction } from '@angular/cdk/bidi';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Dropdown } from 'primeng/dropdown';
import { MultiSelect } from 'primeng/multiselect';
import { field, SelectControlConfig } from '../../models/form-field.model';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss'],
})
export class DropdownFilterComponent implements OnInit, OnChanges {
  @Input() columnConfig: field | any;
  @Input() dependValu: { [key: string]: any } = {};
  @Input() dir: Direction = 'ltr';
  @Input() onClear = new EventEmitter();
  @Output() onSelect = new EventEmitter<any>();
  @ViewChild('dp') dropdown!: Dropdown;
  @ViewChildren('dp_multiple')
  dropdownMultipleComponents: QueryList<MultiSelect> | any;

  dropDownColumnConfig: SelectControlConfig | any;
  private areDropdownItemsLoading = false;
  private areDropdownItemsHaveError = false;
  query: Array<any> = [];

  constructor() {}

  getDropdownMessage(): string {
    if (this.areDropdownItemsLoading) {
      return 'Loading ...';
    }
    if (this.areDropdownItemsHaveError) {
      return 'An error occurred ...';
    }
    return 'No results found';
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

  getValue(selectedValues: any) {
    return this.dropDownColumnConfig.options
      .filter((v: any) => {
        return selectedValues.indexOf(v.id) > -1;
      })
      .map((el: any) => el.value)
      .join(',');
  }

  getSingleDropdownValue(value: any) {
    let i = this.dropDownColumnConfig.options.findIndex(
      (v: any) => value == v.id
    );
    if (i > -1) return this.dropDownColumnConfig.options[i].value;
  }
  ngOnInit(): void {
    this.dropDownColumnConfig = this.columnConfig
      .control as SelectControlConfig;
  }

  updateStatus(value: any, key: any) {
    this.onSelect.emit({ [key]: value });
  }
}
