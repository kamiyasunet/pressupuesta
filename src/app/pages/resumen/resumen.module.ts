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
  NbSpinnerModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartModule } from 'angular2-chartjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Ng2SmartTableModule } from 'ng2-smart-table';
//import { RouterModule } from '@angular/router';

import { ResumenComponent } from './resumen.component';
import { EstatusListaComponent } from './estatus-lista/estatus-lista.component'; 
import { ListaUsuarioComponent } from './lista-usuario/lista-usuario.component';
import { PieComponent } from './pie/pie.component';
import { EchartsPieComponent } from './pie/echarts-pie.component';

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
    NbSpinnerModule
    
  ],
  declarations: [
    ResumenComponent, 
    EstatusListaComponent,
    ListaUsuarioComponent,
    PieComponent,
    EchartsPieComponent]
})
export class ResumenModule {
  
 }
