import { NgModule } from '@angular/core';
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
/* import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts'; */
import { ChartModule } from 'angular2-chartjs'; 
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { ActividadComponent } from './actividad.component';
import { AgmCoreModule } from '@agm/core';
import { NbAlertModule } from '@nebular/theme';
import { ModalOverlaysRoutingModule } from '../modal-overlays/modal-overlays-routing.module';
import { AvanceComponent } from './avance/avance.component';
import { DescripcionComponent } from './descripcion/descripcion.component';
import { OverviewModule } from './overview/overview.module';
import { OverviewComponent } from './overview/overview.component';
import { ChartjsLineComponent } from './overview/chartjs-line.component';
import { ChartjsBarHorizontalComponent } from './overview/chartjs-bar-horizontal.component';
import { RequisicionComponent } from './requisicion/requisicion.component';
import { CambiosComponent } from './cambios/cambios.component';


@NgModule({
  declarations: [

    ActividadComponent,
    AvanceComponent,
    DescripcionComponent,
    OverviewComponent,
    ChartjsLineComponent,
    ChartjsBarHorizontalComponent,
    RequisicionComponent,
    CambiosComponent,
   
    
    ],
  imports: [
    ChartModule,
    OverviewModule,
    ModalOverlaysRoutingModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbTabsetModule,
    ThemeModule,
    NbAutocompleteModule,
    NbRouteTabsetModule,
    NbAlertModule,
    NbInputModule,
    NbTabsetModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NbStepperModule,
    NbListModule,
    NbProgressBarModule,
    NbTooltipModule,
    NbAccordionModule,
    NbLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbwNnaZqeajWbczNw_uAWJFoM2gTUVTsA'
    }),
  ] 
})
export class ActividadModule { } 
