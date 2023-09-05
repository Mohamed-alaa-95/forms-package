import { Direction } from '@angular/cdk/bidi';
import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  Optional,
} from '@angular/core';
import { field } from './models/form-field.model';
import { IAction } from './models/IAction.model';
import { HeaderAction, Title } from './models/table-header.model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'lib-prime-widget',
  templateUrl: './prime-widget.component.html',
  styleUrls: ['./prime-widget.component.scss'],
})
export class PrimeWidgetComponent implements OnChanges {
  @Input() selectedRows: any[] | any;
  @Output() onUpdateSelectedRows = new EventEmitter();
  @Output() dataChanged = new EventEmitter();
  @Output() onUpdateDependedValue = new EventEmitter();
  @Output() onTableActionClicked = new EventEmitter();
  @Output() onActionClicked = new EventEmitter();
  @Output() onClearClicked = new EventEmitter();
  @Input() isTableAccessible = true;
  @Input() hasData: boolean = true;
  @Input() sortField: string = 'id';
  @Input() sortOrder: number = -1;
  @Input() defaultSortOrder = -1;
  @Input() isTableActionsAccessible = false;
  @Input() first: number = 0;
  @Input() rows = 10;
  @Input() tableActions: Array<IAction> = [
    {
      text: 'Edit Merchant',
      class: 'editMerchant',
      icon: 'pi pi-pencil',
      method: 'editMerchant',
      checkRole: ['write'],
      isVisible: true,
      order: 1,
    },
    {
      text: 'Edit Mecccccrchant',
      class: 'editMerchant',
      icon: 'pi pi-pencil',
      method: 'editMerchant',
      checkRole: ['write'],
      isVisible: false,
      order: 2,
    },
    {
      text: 'Edit Merchant',
      class: 'editMerchant',
      icon: 'pi pi-pencil',
      method: 'editMerchant',
      checkRole: ['write'],
      isVisible: true,
      order: 3,
    },
  ];
  @Input() allowSelection: boolean = false;
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
  @Input() allowFilter = true;
  @Input() queryParams!: { [key: string]: any };
  @Input() totalRecords: number = 10;
  @Input() globalFilterFields: string[] = [];
  @Input() simpleData: any[] = [];
  @Input() dir: Direction = 'ltr';
  @Input() data: any = [];
  @Input() columns: field[] = [
    {
      type: 'text',
      control: {
        required: true,
        name: 'user_id',
        label: 'User ID',
        searchable: true,
        show: true,
      },
    },
    {
      type: 'date_time',
      control: {
        required: false,
        name: 'date_range',
        label: 'Date range',
        range: true,
        searchable: true,
        show: true,
      },
    },
    {
      type: 'number',
      control: {
        required: false,
        name: 'number',
        label: 'Number',
        range: false,
        searchable: true,
        show: false,
      },
    },
    {
      type: 'date',
      control: {
        required: false,
        name: 'date',
        label: 'Date',
        range: false,
        searchable: true,
      },
    },
    {
      type: 'text',
      control: {
        required: true,
        name: 'khazna_id',
        label: 'Khazna ID',
        searchable: true,
      },
    },
    {
      type: 'dropdown',
      control: {
        required: false,
        name: 'status',
        label: 'Status',
        options: [{ status_type: 'Created' }, { status_type: 'Cancelled' }],
        valueField: 'status_type',
        description: 'status_type',
        searchable: true,
      },
    },
    {
      type: 'auto_complete',
      control: {
        required: false,
        name: 'country',
        label: 'Country',
        options: [{ code: 'EGYPT' }, { code: 'AUE' }],
        key: 'code',
        multiple: true,
        searchable: true,
      },
    },
    {
      type: 'dropdown',
      control: {
        required: false,
        multiple: true,
        name: 'company',
        label: 'Company',
        options: [{ company: 'comp1' }, { company: 'comp2' }],
        valueField: 'company',
        description: 'company',
        searchable: true,
      },
    },
    {
      type: 'number',
      control: {
        required: true,
        name: 'card_number',
        label: 'card number',
        searchable: false,
        range: true,
      },
    },
    {
      type: 'number',
      control: {
        required: true,
        name: 'masked_number',
        label: 'Masked Number',
        searchable: true,
      },
    },
  ];
  @Input() title!: string;
  constructor(@Optional() public config: DynamicDialogConfig) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.onUpdateSelectedRows.next(this.selectedRows);
  }

  getData(ev: any) {
    this.dataChanged.next(ev);
  }
  handleTableActionClick(ev: any) {
    this.onTableActionClicked.next(ev);
  }
  updateSelection(ev: any) {
    this.onUpdateSelectedRows.next(ev);
  }
  onDependValue(ev: any) {
    this.onUpdateDependedValue.next(ev);
  }
  handleActionClick(ev: any) {
    this.onActionClicked.next(ev);
  }

  onClear(event: any) {
    this.onClearClicked.next(event);
  }
}
