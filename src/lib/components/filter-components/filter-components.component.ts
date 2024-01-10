import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-filter-components',
  templateUrl: './filter-components.component.html',
  styleUrls: ['./filter-components.component.css']
})
export class FilterComponentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.columns.forEach((col: any) => {
      this.query[col.control.name] = ''
    })
  }
  @Input() flexDirectionColumn: any;
  @Input() columns: any;
  @Output() onFilter: EventEmitter<any> = new EventEmitter<any>();
  query = {};

  filter() {
    this.onFilter.emit(this.query);
  }

  clear() {
    this.query = {}
  }
}
