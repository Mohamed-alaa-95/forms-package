import { Component, Input, OnInit } from '@angular/core';
import * as Papa from 'papaparse';
@Component({
  selector: 'app-file-filter',
  templateUrl: './file-filter.component.html',
  styleUrls: ['./file-filter.component.css']
})
export class FileFilterComponent implements OnInit {

  constructor() { }
  @Input() columnConfig: any;
  @Input() query: any;
  selectedFile: any;
  ngOnInit(): void {
  }

  onSelectFile(event: any) {
    if (event.target.files[0].type !== 'text/csv') {
      return;
    }
    if (event.target.files[0].size > 1000000) {
      return;
    }
    const toUploadedFile = event.target.files[0];
    Papa.parse(toUploadedFile, {
      header: false,
      skipEmptyLines: true,
      complete: (result: any) => {
        if (result.data.flat()[0] === this.columnConfig.file_config[0].label) {
          const csvData = result.data.slice(1).flatMap((el: any) => el[0]).filter((el: any) => el.match(/^[0-9]{14}$/gm))
          this.query[this.columnConfig.control.name] = csvData;
        } else this.query[this.columnConfig.control.name] = [];
        this.selectedFile = null;
      }
    })
  }

  downloadSample(importConfig: any) {
    console.log('here');
    const sampleData = importConfig.headers.reduce((previous: any, key: any) => {
      previous[key.label] = key['sample'];
      return previous;
    }, {});
    const columns = Object.keys(sampleData).map(col => { return { type: 'string', control: { name: col, label: col } } })
    this.exportPackage.exportData({ sampleData: [sampleData] }, { sampleData: columns }, importConfig.fileType == 'Csv' ? 'csv' : 'xlsx', importConfig.sample_file_name, [])
  }

}
