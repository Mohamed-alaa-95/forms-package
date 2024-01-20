import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ExportPackageService } from '@khaznatech/export-package';
import { Papa } from 'ngx-papaparse';
@Component({
  selector: 'app-file-filter',
  templateUrl: './file-filter.component.html',
  styleUrls: ['./file-filter.component.css']
})
export class FileFilterComponent implements OnChanges {

  constructor(private papa: Papa, private exportPackage: ExportPackageService) { }
  @Input() columnConfig: any;
  @Input() form: FormGroup = new FormGroup({});
  @Input() onClearFilter = new EventEmitter();
  fileName: string = 'Missing File';
  fileFilterForm: FormGroup = new FormGroup({
    selectedFile: new FormControl()
  })

  ngOnChanges(): void {
    this.onClearFilter.subscribe((res) => {
      if (res['key'] == 'clear all') {
        this.fileFilterForm?.controls['selectedFile']?.setValue(null);
        this.fileName = 'Missing File';
      }
    });
  }

  onSelectFile(event: any) {
    if (event.target.files[0].type !== this.columnConfig.control.fileType) {
      this.fileFilterForm.controls['selectedFile'].setValue(null)
    }
    if (event.target.files[0].size > this.columnConfig.control.maxFileSize) {
      this.fileFilterForm.controls['selectedFile'].setValue(null)
    }

    const toUploadedFile = event.target.files[0];
    this.fileName = toUploadedFile.name;
    this.papa.parse(toUploadedFile, {
      header: false,
      skipEmptyLines: true,
      complete: (result: any) => {
        if (result.data.flat()[0] === this.columnConfig.control.fileConfig[0].label) {
          const csvData = result.data.slice(1).flatMap((el: any) => el[0]).filter((el: any) => el.match(this.columnConfig.control.fileConfig[0].regex));
          this.form.controls[this.columnConfig.control.name].setValue(csvData);
        } else this.form.controls[this.columnConfig.control.name].setValue([]);
        this.fileFilterForm.controls['selectedFile'].setValue(null)
      }
    })
  }

  downloadSample(columnConfig: any) {
    const sampleData = columnConfig.control.fileConfig.reduce((previous: any, key: any) => {
      previous[key.label] = key['sample'];
      return previous;
    }, {});
    const columns = Object.keys(sampleData).map(col => { return { type: 'string', control: { name: col, label: col } } })
    this.exportPackage.exportData({ sampleData: [sampleData] }, { sampleData: columns }, columnConfig.control.fileType, columnConfig.control.fileTitle, [])
  }

  clearSelectedFile() {
    this.fileFilterForm.controls['selectedFile'].setValue(null);
    this.fileFilterForm.controls['selectedFile'].updateValueAndValidity();
    this.fileName = 'Missing File';
  }
}
