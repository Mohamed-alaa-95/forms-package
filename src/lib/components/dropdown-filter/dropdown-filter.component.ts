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
  @Input() queryParams!: { [key: string]: any };
  @Output() onSelect = new EventEmitter<any>();
  @ViewChild('dp') dropdown!: Dropdown;
  @ViewChildren('dp_multiple')
  dropdownMultipleComponents: QueryList<MultiSelect> | any;

  dropDownColumnConfig: SelectControlConfig | any;
  private areDropdownItemsLoading = false;
  private areDropdownItemsHaveError = false;
  query: Array<any> = [];
  selectedItems: Array<any> = [];
  selectedItem!: any

  constructor() { }

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

  setSingleDropDown() {
    this.selectedItem = this.queryParams[this.columnConfig.control.name]?.value
  }

  setMultipleDropDown() {
    this.selectedItems = [...this.queryParams[this.columnConfig.control.name]?.value]
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
    if (this.queryParams && this.queryParams[this.columnConfig.control.name]) {
      if (this.columnConfig.control.multiple)
        this.setMultipleDropDown()
      else
        this.setSingleDropDown()
    }
  }

  updateStatus(value: any, key: any) {
    this.onSelect.emit({ [key]: value });
  }
}
