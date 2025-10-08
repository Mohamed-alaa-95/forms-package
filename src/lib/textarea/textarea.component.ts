import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class TextareaComponent {
  @Input() form!: FormGroup;
  @Input() columnConfig: any;
}
