import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  ngOnInit(): void {
  }
  @Input() form: FormGroup;
  @Input() configuration: any;

}
