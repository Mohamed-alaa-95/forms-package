import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { field } from 'src/lib/models/form-field.model';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {
  @Input() columnConfig: field;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
