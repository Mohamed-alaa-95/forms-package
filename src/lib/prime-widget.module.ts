import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { PrimeWidgetComponent } from './prime-widget.component';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutocompleteFilterComponent } from './components/autocomplete-filter/autocomplete-filter.component';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';
import { FilterTableComponent } from './components/filter-table/filter-table.component';
import { HeaderActionsComponent } from './components/header-actions/header-actions.component';
import { InputFilterComponent } from './components/input-filter/input-filter.component';
import { NumbersOnly } from './directives/number-only.directive';
import { NumberFilterComponent } from './components/number-filter/number-filter.component';
import { DateTimeComponent } from './components/date-time/date-time.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { NumberAndDecimalOnly } from './directives/number.directive';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { FileFilterComponent } from './components/file-filter/file-filter.component';
import { FilterComponentsComponent } from './components/filter-components/filter-components.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { DateFieldComponent } from './components/date-field/date-field.component';
import { ExportPackageModule, ExportPackageService } from '@khaznatech/export-package';
import { CheckboxComponent } from './components/checkbox-field/checkbox.component';
import {CheckboxModule} from 'primeng/checkbox';
const primeModules = [
  SliderModule,
  DialogModule,
  ContextMenuModule,
  TableModule,
  CalendarModule,
  SliderModule,
  DialogModule,
  MultiSelectModule,
  ContextMenuModule,
  DropdownModule,
  ButtonModule,
  ToastModule,
  InputTextModule,
  InputNumberModule,
  RadioButtonModule,
  ProgressBarModule,
  TooltipModule,
  CardModule,
  PanelModule,
  AutoCompleteModule,
  CheckboxModule
];
@NgModule({
  declarations: [
    FilterTableComponent,
    HeaderActionsComponent,
    DropdownFilterComponent,
    DateFilterComponent,
    AutocompleteFilterComponent,
    InputFilterComponent,
    NumbersOnly,
    PrimeWidgetComponent,
    NumberFilterComponent,
    DateTimeComponent,
    DynamicFormComponent,
    NumberAndDecimalOnly,
    NumberInputComponent,
    AutoCompleteComponent,
    DropDownComponent,
    FileFilterComponent,
    FilterComponentsComponent,
    InputFieldComponent,
    DateFieldComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...primeModules,
    ExportPackageModule
  ],
  providers: [ConfirmationService, MessageService, ExportPackageService],
  exports: [
    FilterTableComponent,
    HeaderActionsComponent,
    DropdownFilterComponent,
    DateFilterComponent,
    AutocompleteFilterComponent,
    InputFilterComponent,
    NumbersOnly,
    PrimeWidgetComponent,
    NumberFilterComponent,
    DateTimeComponent,
    primeModules,
    DynamicFormComponent,
    NumberAndDecimalOnly,
    NumberInputComponent,
    AutoCompleteComponent,
    DropDownComponent,
    FileFilterComponent,
    FilterComponentsComponent,
    InputFieldComponent,
    DateFieldComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PrimeWidgetModule {
  constructor() { }
}
