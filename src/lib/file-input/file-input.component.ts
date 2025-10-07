import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'lib-file-input',
  imports: [FileUploadModule, ButtonModule],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.css',
})
export class FileInputComponent {
  @ViewChild('uploader') uploader: FileUpload | undefined;
  @Input() form: FormGroup = new FormGroup({});
  @Input() columnConfig: any;
  @Input() onClearFilter = new EventEmitter();
  @Input() label: string;
  @Output() onClickDownloadSample = new EventEmitter<any>();
  @Output() onSelectFile = new EventEmitter<any>();
  fileSelected: boolean = false;
  selectedFile: File | null = null;
  onUpload(event: any, uploader: FileUpload) {
    this.fileSelected = true;
    this.selectedFile = event.files[0];
    this.onSelectFile.emit({ event, uploader });
  }

  downloadSample() {
    this.onClickDownloadSample.emit(this.columnConfig);
  }

  onClearSelectedFile() {
    this.fileSelected = false;
    this.selectedFile = null;
    this.form.controls[this.columnConfig?.control?.name].setValue(null);
    if (this.uploader) this.uploader.clear();
  }
}
