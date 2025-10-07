import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';
import { Select } from 'primeng/select';

@Component({
  selector: 'lib-boolean-dropdown',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MultiSelect,
    Select,
  ],
  templateUrl: './boolean-dropdown.component.html',
  styleUrl: './boolean-dropdown.component.css',
})
export class BooleanDropdownComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    this.columnConfig.control.options = [
      { name: 'Yes', id: true },
      { name: 'No', id: false },
    ];
  }
  @Input() columnConfig: any;
  @ViewChild('dp') dropdown!: Select;
  @ViewChildren('dp_multiple') dropdownMultipleComponents:
    | QueryList<MultiSelect>
    | any;
  @Input() form: FormGroup = new FormGroup({});
  @Output() onSelect = new EventEmitter<any>();
  @Input() onClear = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.onClear.subscribe((res) => {
      if (res['key'] != 'clear all') {
        if (this.columnConfig?.control?.name == res['key']) {
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
    this.onSelect.emit({
      [this.columnConfig?.control?.filterKey
        ? this.columnConfig?.control?.filterKey
        : this.columnConfig?.control?.name]: event?.value?.length
        ? event?.value
        : [],
    });
  }

  getValue(selectedValues: any) {
    return this.columnConfig?.control?.options
      .filter((v: any) => {
        return (
          selectedValues.indexOf(
            v[
              this.columnConfig?.control?.optionValue
                ? this.columnConfig?.control?.optionValue
                : 'name'
            ]
          ) > -1
        );
      })
      .map(
        (el: any) =>
          el[
            this.columnConfig?.control?.optionLabel
              ? this.columnConfig?.control?.optionLabel
              : 'name'
          ]
      )
      .join(',');
  }

  updateStatus(value: any) {
    this.onSelect.emit({ [this.columnConfig?.control?.name]: value });
  }

  getSingleDropdownValue(value: any) {
    let i = this.columnConfig.options.findIndex(
      (v: any) =>
        value ==
        v[
          this.columnConfig?.control?.optionValue
            ? this.columnConfig?.control?.optionValue
            : 'name'
        ]
    );
    if (i > -1)
      return this.columnConfig?.options[i][
        this.columnConfig?.control?.optionValue
          ? this.columnConfig?.control?.optionValue
          : 'name'
      ];
  }

  clearSingleDropDown() {
    if (this.dropdown) {
      this.dropdown.clear();
    }
  }

  clearMultipleDropDown() {
    if (this.dropdownMultipleComponents) {
      this.dropdownMultipleComponents?.toArray()?.forEach((el: any) => {
        el.value = [];
        el.hide();
      });
    }
  }
}
