import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'lib-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, TextareaModule],
})
export class TextareaComponent {
  @Input() form!: FormGroup;
  @Input() columnConfig: any;
  @Input() errorMessage: string = 'This field is required';

}
