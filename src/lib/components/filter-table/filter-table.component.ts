import { DateControlConfig } from './../../models/form-field.model';
import { HeaderAction } from './../../models/table-header.model';
import { field } from '../../models/form-field.model';

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IAction } from '../../models/IAction.model';
import { Direction } from '@angular/cdk/bidi';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss'],
})
export class FilterTableComponent implements OnChanges {
  @Input() data: Array<any> = [];
  @Input() isTableAccessible = true;
  @Input() totalRecords: number | undefined;
  @Input() columns: Array<field> | undefined;
  @Input() allowSelection: boolean = false;
  @Input() allowFilter: boolean | undefined = true;
  @Input() tableActions: IAction[] | undefined;
  @Input() simpleData: any[] = [];
  @Input() sortOrder: number = -1;
  @Input() sortField: string = '';
  @Input() isTableActionsAccessible = false;
  @Input() onUpdateSelectedRows = new EventEmitter();
  @Input() dir: Direction = 'ltr';
  @Input() hasData = true;
  @Input() queryParams!: { [key: string]: any };
  @Input() title!: string;
  @Input() actions: HeaderAction | any = {
    Actions: [
      {
        text: 'Activate',
        class: 'activateMerchantUser',
        icon: 'pi pi-check-circle',
        method: 'changeStatus',
        checkRole: ['write'],
        isVisible: true,
        validations: { active: ['inactive'] },
        options: {
          title: 'Activate Merchant',
          api: '/admin/merchants/status/active',
          method: 'put',
          status: 'Activate',
          key: 'merchant_ids',
        },
      },
      {
        text: 'Deactivate',
        class: 'deactivateMerchantUser',
        icon: 'pi pi-times-circle',
        method: 'changeStatus',
        checkRole: ['write'],
        isVisible: true,
        validations: { active: ['active'] },
        options: {
          title: 'Deactivate Merchant',
          api: '/admin/merchants/status/inactive',
          method: 'put',
          status: 'Deactivate',
          key: 'merchant_ids',
        },
      },
      {
        text: 'Add Merchant',
        class: 'addMerchant',
        icon: 'pi pi-plus',
        method: 'addMerchant',
        checkRole: ['write'],
        isVisible: true,
        isDisabled: true,
      },
    ],

    // exportCSV: [
    //   {
    //     text: 'Export Csv',
    //     class: 'exportCsv',
    //     icon: 'pi pi-file',
    //     method: 'exportCsv',
    //     checkRole: ['read', 'write'],
    //     isVisible: true,
    //   },
    // ],
    exportEcel: {
      text: 'Export Excel',
      class: 'exportExcel',
      icon: 'pi pi-file-excel',
      method: 'exportExcel',
      checkRole: ['read', 'write'],
      isVisible: true,
      isDisabled: true,
      disabledReason: 'disabled reason',
    },

    sync: {
      text: 'sync',
      class: 'sync',
      icon: 'pi pi-refresh',
      method: 'sync',
      checkRole: ['read', 'write'],
      isVisible: true,
    },
  };
  @Output() onDataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickTableAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDependValue: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClear = new EventEmitter();
  @Output() onActionClicked = new EventEmitter();
  // @Input() selection = []
  type = 'dropDown';
  selectedRows: any[] = [];
  backupSelection: any[] = [];
  dependValu: { [key: string]: any } = {};
  globalFilterFields!: any;
  firstValue: number | undefined;
  @ViewChild('dt') table: Table | undefined;
  isConnected = true;
  constructor(
    private messagerService: MessageService,
    private connectionService: ConnectionService
  ) {
    this.connectionService.monitor().subscribe((connection) => {
      this.isConnected = connection.hasInternetAccess && connection.hasNetworkConnection;
    });
  }

  getMiddle() {
    if (this.columns) return this.columns?.length + 5;

    return 0;
  }

  getConnectionError() {
    this.messagerService.add({
      severity: 'error',
      detail: ' .حدث خطأ، برجاء التأكد من الإتصال بالشبكة',
    });
  }

  trackByMethod(index: number, el: any): number {
    return el.order;
  }

  loadData(event: LazyLoadEvent) {
    this.firstValue = event.first;
    // this.selectedRows = [];
    this.onSelectAction.emit(this.backupSelection);
    this.onDataChange.emit(event);
  }

  onSelectChange(ev: any, dt: Table | any) {
    Object.keys(ev).forEach((key) => {
      dt.filters[key].value = ev[key];
      this.columns?.forEach((col) => {
        if (col.control.depends) {
          this.dependValu[col.control.depends] =
            dt.filters[col.control.depends].value;
          if (dt.filters[col.control.depends].value) {
            this.onDependValue.emit({
              column: col,
              value: ev ? ev[col.control.depends] : null,
            });
          } else {
            dt.filters[col.control.name].value = null;
            this.onClear.emit({ key: col.control.name });
          }
        }
      });
    });
  }

  getRowData(str: any) {
    if (String(str).length > 15)
      return this.dir === 'rtl'
        ? ' ...' + String(str).substring(0, 15)
        : String(str).substring(0, 15) + ' ...';
    else return str;
  }

  checkLength(col: field, str: any) {
    return col.type !== 'image' && String(str).length > 15;
  }

  onSelectionChange(value: string | any) {
    this.selectedRows = value;
    if (value.length > 0) {
      this.data.forEach((row: { selected: boolean }) => (row.selected = false));
      this.data
        .filter((row: { id: any }) =>
          this.selectedRows?.some((o2) => row.id === o2.id)
        )
        .forEach((row: { selected: boolean }) => (row.selected = true));
    } else {
      this.data.forEach((element: { selected: boolean }) => {
        element.selected = false;
      });
    }
    this.updateSelectionOnSelect();
    this.onSelectAction.emit(this.backupSelection);
  }

  updateSelectionOnSelect() {
    this.backupSelection = this.backupSelection?.filter((el, i) => {
      return this.data?.every((element: any) => element?.id !== el?.id);
    });
    this.backupSelection = [...this.backupSelection, ...this.selectedRows];
  }

  setSelectedClass() {
    this.data?.forEach((row: any) => (row.selected = false));
    this.data
      ?.filter((row: any) => this.selectedRows?.some((o2) => row?.id === o2?.id))
      ?.forEach((row: any) => (row.selected = true));
  }

  getSelection() {
    this.selectedRows = this.backupSelection?.filter((selectedElement) => {
      return this.data?.some(
        (dataElement: any) => selectedElement?.id == dataElement?.id
      );
    });
    this.setSelectedClass();
  }

  handleActionClick(ev: any) {
    this.onActionClicked.emit(ev);
  }

  clear(table: Table) {
    for (let key in table.filters) {
      table.filters[key]['value'] = null;
    }
    this.firstValue = table.first = 0;
    table.rows = 10;
    table.defaultSortOrder = -1;
    table.sortField = 'id';
    table.reset();
    // this.loadData({
    //   filters: { filters },
    //   first: this.firstValue,
    //   globalFilter: null,
    //   multiSortMeta: undefined,
    //   rows: 10,
    //   sortField: this.sortField,
    //   sortOrder: this.sortOrder,
    // });

    this.dependValu = {};
    this.onClear.emit({ key: 'clear all' });
  }

  getNumberOfColumn(col: any) {
    return +col;
  }

  clickTableAction(action: any, row: any) {
    this.onClickTableAction.emit({ action: action, row: row });
  }

  ngOnChanges(): void {
    this.onUpdateSelectedRows.subscribe((rows) => {
      this.selectedRows = rows;
      this.backupSelection = rows;
      this.setSelectedClass();
    });
    this.globalFilterFields = this.columns?.map((col) => col.control.name);
    this.getSelection();
  }

  public rowActionCheck(action: IAction | any, row: { [x: string]: any }) {
    let valid = true;
    if (action.rowValidations) {
      Object.keys(action.rowValidations).forEach(
        (key) =>
        (valid =
          valid &&
          action.rowValidations[key].some((validateValue: any) => {
            if (!validateValue && !row[key]) return false;
            return validateValue ? validateValue == row[key] : true;
          }))
      );
    }
    return valid;
  }
  onSelectDateChange(
    ev: any,
    dt: { filters: { [x: string]: { value: any } } | any }
  ) {
    Object.keys(ev).forEach((key) => {
      dt.filters[key].value = ev[key];
    });
  }
  onInputChange(ev: any, dt: any) {
    Object.keys(ev).forEach((key) => {
      dt.filters[key].value = ev[key];
    });
  }
  columnControl(col: field) {
    return col.control as DateControlConfig
  }
}
