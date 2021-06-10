import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular2-chartjs';
import { NbCardModule, NbProgressBarModule } from '@nebular/theme';


@NgModule({
  declarations: [

       
  ],
  imports: [
    CommonModule,
    ChartModule,
    NbCardModule,
    NbProgressBarModule,
  ]
})
export class OverviewModule { }
