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
  NbWindowModule
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule, FormsModule } from '@angular/forms';
import { ActividadComponent } from './actividad.component';
import { AgmCoreModule } from '@agm/core';
import { ChartsRoutingModule } from '../charts/charts-routing.module';
import { NbAlertModule } from '@nebular/theme';
import { ModalOverlaysRoutingModule } from '../modal-overlays/modal-overlays-routing.module';
import { AvanceComponent } from './avance/avance.component';
import { DescripcionComponent } from './descripcion/descripcion.component';
import { OverviewComponent } from './overview/overview.component';
import { ChartjsBarHorizontalComponent } from './chartjs-bar-horizontal.component';
import { ChartjsLineComponent } from './chartjs-line.component';


const components = [
   ChartjsLineComponent,
   ChartjsBarHorizontalComponent,

];


@NgModule({
  declarations: [
    components,
    ActividadComponent,
    AvanceComponent,
    DescripcionComponent,
    OverviewComponent,
    
    ],
  imports: [
    ModalOverlaysRoutingModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    ChartsRoutingModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbTabsetModule,
    ThemeModule,
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbwNnaZqeajWbczNw_uAWJFoM2gTUVTsA'
    }),
  ] 
})
export class ActividadModule { } 
