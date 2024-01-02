import { Component, Input, OnInit } from '@angular/core';
import { field } from '@khaznatech/khazna-elements-package/lib/models/form-field.model';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {
  @Input() columnConfig: field;
  @Input() query;
  constructor() { }

  ngOnInit(): void {
  }

}
