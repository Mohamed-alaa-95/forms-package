import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-components',
  templateUrl: './filter-components.component.html',
  styleUrls: ['./filter-components.component.css']
})
export class FilterComponentsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.columns.forEach(col => {
      this.query[col.control.name] = ''
    })
  }
  @Input() flexDirectionColumn: any;
  @Input() columns = [{
    "type": "file",
    "control": {
      "name": "id",
      "label": "ID",
      "state": "private",
      "range": false,
      "note": false,
      "required": false,
      "negative": false,
      "multiple": false,
      "searchable": true,
      "show": true,
      "sortable": true,
      "exactMatch": false,
      "file_config": [
        {
          "name": "national_id_number",
          "label": "National ID Number",
          "type": "string",
          "dropdown": false,
          "dropdown_single": false,
          "dropdown_multiple": false,
          "exact_match": false,
          "searchable": false,
          "sortable": true,
          "show": false,
          "required": false,
          "sample": "xxxxxxxxxxxxxx",
          "date_range": false,
          "numeric_range": false,
          "auto_complete": false,
          "date_time_range": false,
          "state": "private",
          "dropdown_single_auto_complete": false,
          "aggregator": false,
          "hide_time": false,
          "skip": false
        }
      ],
    }
  }];

  query = {};

  filter() {
    console.log(this.query);
  }

  clear() {
    this.query = {}
  }
}
