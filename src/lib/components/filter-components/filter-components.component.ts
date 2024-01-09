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
    this.columns.forEach((col: any) => {
      this.query[col.control.name] = ''
    })
  }
  @Input() flexDirectionColumn: any;
  @Input() columns: any = [{
    "type": "date",
    "control": {
      "name": "id",
      "label": "ID",
      "state": "private",
      "range": true,
      "note": false,
      "required": false,
      "negative": false,
      "multiple": false,
      "searchable": true,
      "show": true,
      "sortable": true,
      "exactMatch": false,
      "fileTitle": 'national_id_number',
      divided: true

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
