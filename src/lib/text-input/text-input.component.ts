import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  
  imports: [CommonModule, ReactiveFormsModule, InputTextModule]
})
export class TextInputComponent {
  @Input() columnConfig: any;
  @Input() form: FormGroup = new FormGroup({});
  @Input() errorMessage: string = 'This field is required';
}
