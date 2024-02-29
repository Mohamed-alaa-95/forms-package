import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { MultiSelect } from 'primeng/multiselect';
import { AutoCompleteConfig } from 'src/lib/models/form-field.model';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() columnConfig: any;
  @Input() dependValue: any;
  @Input() form: FormGroup = new FormGroup({});;
  autoCompleteColumnConfig: any;
  multipleResult: any = [];
  autoCompleteResult: any = [];
  selectedItems: any;
  @ViewChild('autoCompleteDp') autoCompleteDp: AutoComplete;
  @ViewChild('autoCompleteDpMultiple') autoCompleteDpMultiple: MultiSelect;
  @Input() onClear = new EventEmitter();
  oldOptions: any = []
  ngOnInit(): void {
    this.autoCompleteColumnConfig = this.columnConfig.control as AutoCompleteConfig;
    this.oldOptions = JSON.parse(JSON.stringify(this.autoCompleteColumnConfig?.options));
    if (this.form.value[this.autoCompleteColumnConfig.name]) {
      this.form.value[this.autoCompleteColumnConfig.name].forEach((value: string) => this.autoCompleteColumnConfig.options.find((option: any) => option[this.autoCompleteColumnConfig.optionValue ? this.autoCompleteColumnConfig.optionValue : 'name'] === value)['selected'] = true);
      this.sortSelectedValue();
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.onClear.subscribe((res) => {
      if (res['key'] == 'clear all') {
        this.sortOptions()
      }
    });
  }

  autoCompleteSearch(event: any) {
    const query = this.autoCompleteColumnConfig.multiple ? event.filter : event.query;
    this.autoCompleteResult = this.autoCompleteColumnConfig.options.filter(
      (option: any) =>
        option[this.autoCompleteColumnConfig.optionLabel ? this.autoCompleteColumnConfig.optionLabel : 'name'].toLowerCase().indexOf(query?.toLowerCase()) == 0
    );
  }

  getMultipleAutocompleteValue(value: any) {
    return value?.map((res: any) => res?.value).join(',');
  }

  onPanelHide() {
    this.sortSelectedValue();
    this.autoCompleteDpMultiple._filterValue = '';
    this.autoCompleteDpMultiple._filteredOptions = [...this.columnConfig.control.options];
  }

  sortSelectedValue() {
    const selected: any[] = this.autoCompleteColumnConfig.options.filter((r: any) => r.selected == true);
    const oldDropDown = this.oldOptions.filter((rec: any) => {
      const x = selected.findIndex((ob: any) => ob[this.autoCompleteColumnConfig['optionValue'] ? this.autoCompleteColumnConfig['optionValue'] : 'name'] === rec[this.autoCompleteColumnConfig['optionValue'] ? this.autoCompleteColumnConfig['optionValue'] : 'name']);
      return x === -1
    })
    this.autoCompleteColumnConfig.options = [...selected, ...oldDropDown];

  }

  sortOptions() {
    this.autoCompleteColumnConfig.options.forEach((r: any) => r.selected = false);
    this.autoCompleteColumnConfig.options = [...this.oldOptions];
    this.autoCompleteDpMultiple.resetFilter();
  }

  onSelectAutoComplete(event: any) {
    if (this.autoCompleteColumnConfig.multiple) {
      const value = event.value?.map((val: any) => val);
      this.autoCompleteColumnConfig.options.find((obj: any) => obj[this.autoCompleteColumnConfig.optionValue ? this.autoCompleteColumnConfig.optionValue : 'name'] === event?.itemValue)['selected'] = !this.autoCompleteColumnConfig.options?.find((obj: any) => obj[this.autoCompleteColumnConfig.optionValue ? this.autoCompleteColumnConfig.optionValue : 'name'] === event?.itemValue)['selected'];
      this.form.controls[this.columnConfig.control.name].setValue(value);
    } else {
      const value = event.id;
      this.form.controls[this.columnConfig.control.name].setValue(value);
    }
  }

}
