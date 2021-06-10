import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresupuestoComponent } from './presupuesto.component';
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

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NbAlertModule } from '@nebular/theme';
import { ModalOverlaysRoutingModule } from '../modal-overlays/modal-overlays-routing.module';




@NgModule({
  declarations: [
    PresupuestoComponent
  ],
  imports: [
    CommonModule,
    NbAccordionModule,
    NbButtonModule,
    ThemeModule,
    NbCardModule
   
  ]
})
export class PresupuestoModule { }
