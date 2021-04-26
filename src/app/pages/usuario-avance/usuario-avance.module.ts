import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbProgressBarModule,
  NbDatepickerModule,
  NbActionsModule,
  NbCheckboxModule,
  NbRadioModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartModule } from 'angular2-chartjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsuarioAvanceComponent } from './usuario-avance.component';
import { NbInputModule } from '@nebular/theme';
import { FormsRoutingModule } from '../forms/forms-routing.module';



@NgModule({

  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    Ng2SmartTableModule,
    NbDatepickerModule,
    NbInputModule,
    ThemeModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    NbCheckboxModule,
    NbRadioModule,
     FormsRoutingModule    
  ],
  declarations: [
  UsuarioAvanceComponent
    ]
})
export class UsuarioAvanceModule { }
