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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ...primeModules,
  ],
  providers: [PrimeWidgetComponent, ConfirmationService, MessageService],
  exports: [
    NumbersOnly,
    FilterTableComponent,
    HeaderActionsComponent,
    primeModules,
  ],
})
export class PrimeWidgetModule {}
