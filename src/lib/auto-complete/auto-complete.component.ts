import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoComplete, AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  
  imports: [AutoCompleteModule, CommonModule, ReactiveFormsModule, FormsModule, MultiSelectModule]
})
export class AutoCompleteComponent implements OnInit {

  constructor() { }
  @Input() columnConfig: any;
  @Input() dependValue: any;
  @Input() form: FormGroup = new FormGroup({});
  multipleResult: any = [];
  autoCompleteResult: any = [];
  selectedItems: any;
  @ViewChild('autoCompleteDp') autoCompleteDp: AutoComplete | undefined;
  @ViewChild('autoCompleteDpMultiple') autoCompleteDpMultiple: MultiSelect | undefined;
  @Input() onClear = new EventEmitter();
  oldOptions: any = []
  ngOnInit(): void {
    this.oldOptions = JSON.parse(JSON.stringify(this.columnConfig?.control?.options));
    if (this.form.value[this.columnConfig?.control?.filterKey ? this.columnConfig?.control?.filterKey : this.columnConfig?.control?.name]) {
      this.form.value[this.columnConfig?.control?.filterKey ? this.columnConfig?.control?.filterKey : this.columnConfig?.control?.name].forEach((value: string) => {
        const option = this.columnConfig?.control?.options.find((option: any) =>
          option[this.columnConfig?.control?.optionValue ? this.columnConfig?.control?.optionValue : 'name'] === value
        );
        if (option) {
          option['selected'] = true;
        }
      });
    }
  }



  autoCompleteSearch(event: any) {
    const query = this.columnConfig?.control?.multiple ? event.filter : event.query;
    this.autoCompleteResult = this.columnConfig?.control?.options.filter(
      (option: any) =>
        option[this.columnConfig?.control?.optionLabel ? this.columnConfig?.control?.optionLabel : 'name'].toLowerCase().indexOf(query?.toLowerCase()) == 0
    );
  }

  getMultipleAutocompleteValue(value: any) {
    return value?.map((res: any) => res?.value).join(',');
  }


  onSelectAutoComplete(event: any) {
    if (this.columnConfig?.control?.multiple) {
      const value = event.value?.map((val: any) => val);
      this.form.controls[this.columnConfig?.control?.filterKey ? this.columnConfig?.control?.filterKey : this.columnConfig?.control?.name].setValue(value);
    } else {
      const value = event?.value;
      this.form.controls[this.columnConfig?.control?.filterKey ? this.columnConfig?.control?.filterKey : this.columnConfig?.control?.name].setValue(value);
    }
  }

}
