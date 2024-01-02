import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AutoCompleteConfig, field } from '@khaznatech/khazna-elements-package/lib/models/form-field.model';
import { AutoComplete } from 'primeng/autocomplete';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  constructor() { }
  @Input() columnConfig: field;
  @Input() dependValue;
  @Input() query;
  autoCompleteColumnConfig: AutoCompleteConfig | any;
  multipleResult = [];
  autoCompleteResult = [];
  @ViewChild('autoCompleteDp') autoCompleteDp: AutoComplete | any;

  ngOnInit(): void {
    this.autoCompleteColumnConfig = this.columnConfig
      .control as AutoCompleteConfig;
  }
  clearField() {
    this.query[this.columnConfig.control.name] = {};
    this.autoCompleteDp.value = null;
    this.autoCompleteDp.updateInputField();
  }

  autoCompleteSearch(event) {
    const query = this.autoCompleteColumnConfig.multiple ? event.filter : event.query;
    this.autoCompleteResult = this.autoCompleteColumnConfig.options.filter(
      (option) =>
        option.value.toLowerCase().indexOf(query?.toLowerCase()) == 0
    );
  }

  getMultipleAutocompleteValue(value) {
    return value.map((res) => res.value).join(',');
  }

  getAutocompleteValue(name: string) {
    const value = this.query[name];
    if (value) {
      if (this.autoCompleteColumnConfig.multiple) {
        const toolTipString = this.getMultipleAutocompleteValue(value);
        return toolTipString.length > 15 ? toolTipString : null;
      } else {
        const i = this.autoCompleteColumnConfig.options.findIndex(
          (v) => value.id == v.id
        );
        if (i > -1)
          return this.autoCompleteColumnConfig.options[i].value.length > 15
            ? this.autoCompleteColumnConfig.options[i].value
            : null;
      }
    }
  }

  onSelectAutoComplete(event) {
    if (this.autoCompleteColumnConfig.multiple) {
      const value = event.value?.map(val => val?.id);
      this.query[this.autoCompleteColumnConfig.name] = value;
    } else {
      const value = event.id;
      this.query[this.autoCompleteColumnConfig.name] = value;
    }
  }

}
