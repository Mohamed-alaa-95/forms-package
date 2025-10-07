import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { Select, SelectModule } from 'primeng/select';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css'],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MultiSelectModule,
    SelectModule,
  ],
})
export class DropDownComponent implements OnChanges {
  constructor() {}
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
        : undefined,
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
