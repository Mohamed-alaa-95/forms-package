import { Direction } from '@angular/cdk/bidi';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { AutoCompleteConfig, field } from '../../models/form-field.model';

@Component({
  selector: 'app-autocomplete-filter',
  templateUrl: './autocomplete-filter.component.html',
  styleUrls: ['./autocomplete-filter.component.scss'],
})
export class AutocompleteFilterComponent implements OnInit, OnChanges {
  @Input() columnConfig: field | any;
  @Input() dependValu: any;
  @Input() dir :Direction="ltr"
  @Input() onClear = new EventEmitter();
  @Output() onSelect = new EventEmitter<any>();
  autocompleteForm = new FormGroup({
    autoComplete: new FormControl(''),
    multiSelectAutoComplete: new FormControl(''),
  });
  autoCompleteColumnConfig: AutoCompleteConfig | any;
  multipleResult: any = [];
  autoCompleteResult: any = [];
  @ViewChild('autoCompleteDp') autoCompleteDp: AutoComplete | any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.onClear.subscribe((res) => {
      if (res['key'] != 'clear all') {
        if (this.columnConfig.control.name == res['key']) {
          this.clearField();
        }
      } else {
        this.clearField();
      }
    });
  }

  clearField() {
    this.autocompleteForm.reset();
    this.autoCompleteDp.value = null;
    this.autoCompleteDp.updateInputField();
  }

  autoCompleteSearch(event: any) {
    let query = event.query;
    /** TODO
     * add here api call for autoComplete and replace autoCompleteResult with this.autoCompleteColumnConfig.options here and in the template
     *
     */
    this.autoCompleteResult = this.autoCompleteColumnConfig.options.filter(
      (option: any) =>
        option.value.toLowerCase().indexOf(query.toLowerCase()) == 0
    );
  }

  getMultipleAutocompleteValue(value: any) {
    return value.map((res: any) => res.value).join(',');
  }

  getAutocompleteValue(formControlName: string) {
    const value = this.autocompleteForm.get(formControlName)?.value;
    if (value) {
      if (this.autoCompleteColumnConfig.multiple) {
        const toolTipString = this.getMultipleAutocompleteValue(value);
        return toolTipString.length > 15 ? toolTipString : null;
      } else {
        let i = this.autoCompleteColumnConfig.options.findIndex(
          (v: any) => value.id == v.id
        );
        if (i > -1)
          return this.autoCompleteColumnConfig.options[i].value.length > 15
            ? this.autoCompleteColumnConfig.options[i].value
            : null;
      }
    }
  }
  ngOnInit(): void {
    this.autoCompleteColumnConfig = this.columnConfig
      .control as AutoCompleteConfig;
  }

  onSelectAutoComplete(key: string, formControlName: string) {
    if (this.autoCompleteColumnConfig.multiple) {
      let val = this.autocompleteForm
        .get(formControlName)
        ?.value.map((res: any) => res.id)
        .join(',');
      this.onSelect.emit({ [key]: val });
    } else
      this.onSelect.emit({
        [key]: this.autocompleteForm.get(formControlName)?.value.id,
      });
  }
}
