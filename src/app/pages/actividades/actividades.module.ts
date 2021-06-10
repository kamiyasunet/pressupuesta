import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
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
import { CambiosComponent } from './cambios/cambios.component';
import { ActividadesComponent } from './actividades.component';



@NgModule({
  declarations: [
    ActividadesComponent,
    CambiosComponent
  ],
  imports: [
    
    CommonModule, 
    NbAccordionModule,
    NbButtonModule,
    ThemeModule,
    NbCardModule
  ]
})
export class ActividadesModule { } 
