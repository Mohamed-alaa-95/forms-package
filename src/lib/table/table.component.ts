import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import {SkeletonModule} from 'primeng/skeleton';
import { Table } from 'primeng/table';

export interface TableColumn {
  type: 'text' | 'number' | 'date';
  control: {
    name: string;
    label: string;
    sortable?: boolean;
    styleClass?: string;
    hidden?: boolean;
    show? : boolean;
    isStatus?: boolean;
    showBold?: boolean;
  };
}

export interface LazyLoadEvent {
  first?: number;
  rows?: number;
  sortField?: string;
  sortOrder?: number;
  filters?: {[s: string]: {value: any, matchMode: string}};
  globalFilter?: any;
  multiSortMeta?: {field: string, order: number}[];
}

@Component({
  selector: 'lib-table',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    TooltipModule,
    PaginatorModule,
    SkeletonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  @ViewChild('table') table!: Table;

  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() title: string = 'Generic Table';
  @Input() loading: boolean = false;
  @Input() paginator: boolean = true;
  @Input() rows: number = 10;
  @Input() rowsPerPageOptions: number[] = [5, 10, 25, 50];
  @Input() globalFilterFields: string[] = [];
  @Input() selectionMode: 'single' | 'multiple' | null = null;
  @Input() responsive: boolean = true;
  @Input() exportable: boolean = false;
  @Input() resizableColumns: boolean = true;
  @Input() reorderableColumns: boolean = false;
  @Input() emptyMessage: string = 'No records found';
  @Input() totalRecords: number = 0;

  @Output() rowSelect = new EventEmitter<any>();
  @Output() rowUnselect = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<any>();
  @Output() filterChange = new EventEmitter<any>();
  @Output() lazyLoad = new EventEmitter<LazyLoadEvent>();

  selectedItems: any[] = [];
  visibleColumns: TableColumn[] = [];
  Math = Math; // For use in the template
  ngOnInit(): void {
    this.visibleColumns = this.columns.filter((col) => col.control.show);
  }

  onRowSelect(event: any): void {
    this.rowSelect.emit(event);
  }

  onRowUnselect(event: any): void {
    this.rowUnselect.emit(event);
  }

  onPage(event: any): void {
    this.pageChange.emit(event);
  }

  onSort(event: any): void {
    this.sortChange.emit(event);
  }

  onFilter(event: any): void {
    this.filterChange.emit(event);
  }

  onLazyLoad(event: LazyLoadEvent | any): void {
    this.lazyLoad.emit(event);
  }

  rowTrackByFunction(index: number, item: any): any {
    return item.id || index; 
  }
}
