import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { AutoCompleteConfig } from 'src/lib/models/form-field.model';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  constructor() { }
  @Input() columnConfig: any;
  @Input() dependValue: any;
  @Input() form: FormGroup = new FormGroup({});;
  autoCompleteColumnConfig: any;
  multipleResult: any = [];
  autoCompleteResult: any = [];
  selectedItems: any;
  @ViewChild('autoCompleteDp') autoCompleteDp: AutoComplete | any;

  ngOnInit(): void {
    this.autoCompleteColumnConfig = this.columnConfig.control as AutoCompleteConfig;
  }

  autoCompleteSearch(event: any) {
    const query = this.autoCompleteColumnConfig.multiple ? event.filter : event.query;
    this.autoCompleteResult = this.autoCompleteColumnConfig.options.filter(
      (option: any) =>
        option[this.autoCompleteColumnConfig.optionLabel].toLowerCase().indexOf(query?.toLowerCase()) == 0
    );
  }

  getMultipleAutocompleteValue(value: any) {
    return value.map((res: any) => res.value).join(',');
  }

  getAutocompleteValue(name: string) {
    const value = this.form.value[name];
    if (value) {
      if (this.autoCompleteColumnConfig.multiple) {
        const toolTipString = this.getMultipleAutocompleteValue(value);
        return toolTipString.length > 15 ? toolTipString : null;
      } else {
        const i = this.autoCompleteColumnConfig.options.findIndex(
          (v: any) => value == v[this.autoCompleteColumnConfig.optionValue]
        );
        if (i > -1)
          return this.autoCompleteColumnConfig.options[i].value.length > 15
            ? this.autoCompleteColumnConfig.options[i][this.autoCompleteColumnConfig.optionValue]
            : null;
      }
    }
  }

  onSelectAutoComplete(event: any) {
    if (this.autoCompleteColumnConfig.multiple) {
      const value = event.value?.map((val: any) => val);
      this.form[this.columnConfig.control.name].setValue(value);
    } else {
      const value = event.id;
      this.form[this.columnConfig.control.name].setValue(value);
    }
  }

}
