import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExportPackageService } from '@khaznatech/export-package';
import { Papa } from 'ngx-papaparse';
@Component({
  selector: 'app-file-filter',
  templateUrl: './file-filter.component.html',
  styleUrls: ['./file-filter.component.css']
})
export class FileFilterComponent implements OnInit {

  constructor(private papa: Papa, private exportPackage: ExportPackageService) { }
  @Input() columnConfig: any;
  @Input() query: any;
  selectedFile = new FormControl('');

  ngOnInit(): void {
    console.log('hereeee');

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['query'].currentValue[this.columnConfig.control.name] == undefined) {
      this.selectedFile.setValue(null);
    }
  }

  onSelectFile(event: any) {
    if (event.target.files[0].type !== 'text/csv') {
      return;
    }
    if (event.target.files[0].size > 1000000) {
      return;
    }

    const toUploadedFile = event.target.files[0];
    this.papa.parse(toUploadedFile, {
      header: false,
      skipEmptyLines: true,
      complete: (result: any) => {
        if (result.data.flat()[0] === this.columnConfig.control.file_config[0].label) {
          const csvData = result.data.slice(1).flatMap((el: any) => el[0]).filter((el: any) => el.match(/^[0-9]{14}$/gm))
          this.query[this.columnConfig.control.name] = csvData;
        } else this.query[this.columnConfig.control.name] = [];
        this.selectedFile.setValue(null);
        //invalid data
      }
    })
  }

  downloadSample(columnConfig: any) {
    const sampleData = columnConfig.control.file_config.reduce((previous: any, key: any) => {
      previous[key.label] = key['sample'];
      return previous;
    }, {});
    const columns = Object.keys(sampleData).map(col => { return { type: 'string', control: { name: col, label: col } } })
    this.exportPackage.exportData({ sampleData: [sampleData] }, { sampleData: columns }, columnConfig.control.fileType == 'Csv' ? 'csv' : 'xlsx', columnConfig.control.fileTitle, [])

  }

}
