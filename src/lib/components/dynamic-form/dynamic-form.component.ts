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

  onChange(configuration: { errors: { max: any; min: any; maxlength: any; minlength: any; }; name: string | number; }) {
    configuration.errors = {
      max: this.form.controls[configuration.name]?.errors?.['max']?.max,
      min: this.form.controls[configuration.name]?.errors?.['min']?.min,
      maxlength: this.form.controls[configuration.name]?.errors?.['maxlength']?.requiredLength,
      minlength: this.form.controls[configuration.name]?.errors?.['minlength']?.requiredLength,
    };
  }

}
