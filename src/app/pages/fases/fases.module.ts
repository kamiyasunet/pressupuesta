import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { FasesComponent } from './fases.component';
import { TablesRoutingModule } from '../tables/tables-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbDialogModule, NbIconModule,
  NbInputModule,
  NbListModule,
  NbProgressBarModule,
  NbRadioModule,
  NbRouteTabsetModule,
  NbSelectModule,
  NbStepperModule,
  NbTabsetModule,
  NbTooltipModule,
  NbUserModule,
  NbWindowModule,
  NbAccordionModule,
  NbAutocompleteModule,
  NbLayoutModule
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';

import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [FasesComponent, 
],
  imports: [
    CommonModule,
    NbAccordionModule,
    NbButtonModule,
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbUserModule,
    NbListModule,
    FormsModule,
    PipesModule
    
  
  ]
})
export class FasesModule { }
