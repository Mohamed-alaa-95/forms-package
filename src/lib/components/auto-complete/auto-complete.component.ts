import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
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
  @Input() query: any;
  autoCompleteColumnConfig: any;
  multipleResult: any = [];
  autoCompleteResult: any = [];
  @ViewChild('autoCompleteDp') autoCompleteDp: AutoComplete | any;

  ngOnInit(): void {
    this.autoCompleteColumnConfig = this.columnConfig
      .control as AutoCompleteConfig;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['query'].currentValue[this.columnConfig.control.name] == undefined) {
      this.clearField();
    }
  }

  clearField() {
    this.query[this.columnConfig.control.name] = {};
    this.autoCompleteDp.value = '';
    this.autoCompleteDp.updateInputField();
  }

  autoCompleteSearch(event: any) {
    const query = this.autoCompleteColumnConfig.multiple ? event.filter : event.query;
    this.autoCompleteResult = this.autoCompleteColumnConfig.options.filter(
      (option: any) =>
        option.value.toLowerCase().indexOf(query?.toLowerCase()) == 0
    );
  }

  getMultipleAutocompleteValue(value: any) {
    return value.map((res: any) => res.value).join(',');
  }

  getAutocompleteValue(name: string) {
    const value = this.query[name];
    if (value) {
      if (this.autoCompleteColumnConfig.multiple) {
        const toolTipString = this.getMultipleAutocompleteValue(value);
        return toolTipString.length > 15 ? toolTipString : null;
      } else {
        const i = this.autoCompleteColumnConfig.options.findIndex(
          (v: any) => value.id == v.id
        );
        if (i > -1)
          return this.autoCompleteColumnConfig.options[i].value.length > 15
            ? this.autoCompleteColumnConfig.options[i].value
            : null;
      }
    }
  }

  onSelectAutoComplete(event: any) {
    if (this.autoCompleteColumnConfig.multiple) {
      const value = event.value?.map((val: any) => val?.id);
      this.query[this.autoCompleteColumnConfig.name] = value;
    } else {
      const value = event.id;
      this.query[this.autoCompleteColumnConfig.name] = value;
    }
  }

}
