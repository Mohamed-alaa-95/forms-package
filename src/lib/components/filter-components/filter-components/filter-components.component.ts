import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-components',
  templateUrl: './filter-components.component.html',
  styleUrls: ['./filter-components.component.css']
})
export class FilterComponentsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.data.forEach(col => {
      this.query[col.control.name] = ''
    })
  }
  @Input() flexDirectionColumn;
  @Input() data = [
    // {
    //   "type": "number",
    //   "control": {
    //     "name": "id",
    //     "label": "رقم الطلب",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": false,
    //     "searchable": true,
    //     "show": true,
    //     "sortable": true,
    //     "exactMatch": false,
    //     "editable": false
    //   }
    // },
    // {
    //   "type": "number",
    //   "control": {
    //     "name": "invoice_id",
    //     "label": "رقم مطالبة",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": false,
    //     "searchable": true,
    //     "show": true,
    //     "sortable": true,
    //     "exactMatch": false,
    //     "editable": false
    //   }
    // },
    // {
    //   "type": "number",
    //   "control": {
    //     "name": "price",
    //     "label": "الإجمالي",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": false,
    //     "searchable": true,
    //     "show": true,
    //     "sortable": true,
    //     "exactMatch": false,
    //     "editable": false
    //   }
    // },
    // {
    //   "type": "number",
    //   "control": {
    //     "name": "khazna_price",
    //     "label": "المدفوع من خزنة",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": false,
    //     "searchable": true,
    //     "show": true,
    //     "sortable": true,
    //     "exactMatch": false,
    //     "editable": false
    //   }
    // },
    // {
    //   "type": "text",
    //   "control": {
    //     "name": "product_name",
    //     "label": "المشتريات",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": false,
    //     "searchable": true,
    //     "show": true,
    //     "sortable": true,
    //     "exactMatch": false,
    //     "editable": false
    //   }
    // },
    // {
    //   "type": "dropdown",
    //   "control": {
    //     "name": "merchant_name",
    //     "label": "الموزع",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": false,
    //     "entityName": "merchant",
    //     "searchable": true,
    //     "show": true,
    //     "sortable": true,
    //     "exactMatch": false,
    //     "editable": false
    //   }
    // },
    // {
    //   "type": "dropdown",
    //   "control": {
    //     "name": "branch_name",
    //     "label": "الفرع",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": true,
    //     "entityName": "distributer",
    //     "searchable": true,
    //     "show": true,
    //     "sortable": true,
    //     "exactMatch": false,
    //     "depends": "merchant_name",
    //     "editable": false
    //   }
    // },
    // {
    //   "type": "number",
    //   "control": {
    //     "name": "merchant_id",
    //     "label": "رقم الموزع",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": false,
    //     "searchable": true,
    //     "show": false,
    //     "sortable": false,
    //     "exactMatch": false,
    //     "editable": false
    //   }
    // },
    // {
    //   "type": "dropdown",
    //   "control": {
    //     "name": "distributer_id",
    //     "label": "رقم الفرع",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": true,
    //     "searchable": true,
    //     "show": false,
    //     "sortable": true,
    //     "exactMatch": false,
    //     "depends": "merchant_name",
    //     "editable": false
    //   }
    // },
    // {
    //   "type": "text",
    //   "control": {
    //     "name": "employee_id",
    //     "label": "اسم المستخدم",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": false,
    //     "searchable": true,
    //     "show": true,
    //     "sortable": true,
    //     "exactMatch": false,
    //     "editable": false
    //   }
    // },
    // {
    //   "type": "image",
    //   "control": {
    //     "name": "receipt_template_link",
    //     "label": "Receipt Template Link",
    //     "state": "public",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": false,
    //     "searchable": false,
    //     "show": false,
    //     "sortable": false,
    //     "exactMatch": false,
    //     "editable": false
    //   }
    // },
    // {
    //   "type": "number",
    //   "control": {
    //     "name": "main_sys_request_id",
    //     "label": "طلب خزنة",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": false,
    //     "searchable": true,
    //     "show": true,
    //     "sortable": true,
    //     "exactMatch": false,
    //     "editable": false
    //   }
    // },
    // {
    //   "type": "date",
    //   "control": {
    //     "name": "date",
    //     "label": "تاريخ الطلب",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": false,
    //     "searchable": true,
    //     "show": true,
    //     "sortable": true,
    //     "exactMatch": false,
    //     "editable": false,
    //   }
    // },
    {
      "type": "dropdown",
      "control": {
        "name": "req_status_arabic",
        "label": "حالة الطلب",
        "state": "private",
        "range": false,
        "note": false,
        "required": false,
        "negative": false,
        "multiple": false,
        "entityName": "request_status",
        "searchable": true,
        "show": true,
        "sortable": true,
        "exactMatch": false,
        "editable": false,
        options: [
          {
            "id": 1,
            "value": "طلب جديد",
            "status_english": "pending"
          },
          {
            "id": 2,
            "value": "انتظار السداد",
            "status_english": "waiting_payment"
          },
          {
            "id": 3,
            "value": "تم السداد",
            "status_english": "paid"
          }
        ]
      }
    },
    // {
    //   "type": "dropdown",
    //   "control": {
    //     "name": "req_status_id",
    //     "label": "حالة الطلب",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": true,
    //     "searchable": true,
    //     "show": false,
    //     "sortable": true,
    //     "exactMatch": false,
    //     "editable": false
    //   }
    // },
    // {
    //   "type": "dropdown",
    //   "control": {
    //     "name": "is_refunded",
    //     "label": "مرتجع",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": false,
    //     "entityName": "request",
    //     "searchable": true,
    //     "show": true,
    //     "sortable": true,
    //     "exactMatch": false,
    //     "editable": false
    //   }
    // },
    // {
    //   "type": "text",
    //   "control": {
    //     "name": "terminal_id",
    //     "label": "رقم الجهاز",
    //     "state": "private",
    //     "range": false,
    //     "note": false,
    //     "required": false,
    //     "negative": false,
    //     "multiple": false,
    //     "searchable": true,
    //     "show": true,
    //     "sortable": true,
    //     "exactMatch": false,
    //     "editable": false
    //   }
    // }
  ];
  query = {};

  filter() {
    console.log(this.query);

  }
}
