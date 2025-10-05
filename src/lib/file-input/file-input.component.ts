import { Component, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'lib-file-input',
  imports: [FileUploadModule],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.css',
})
export class FileInputComponent {
  @Input() form: FormGroup = new FormGroup({});
  @Input() columnConfig: any;
  @Input() onClearFilter = new EventEmitter();
  @Input() label: string;
  onUpload(event: any) {
    console.log(event);
  }
}
