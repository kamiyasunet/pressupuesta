import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartjsLineComponent } from './chartjs-line.component';
import { ChartjsBarHorizontalComponent } from './chartjs-bar-horizontal.component';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [
    ChartjsLineComponent,
    ChartjsBarHorizontalComponent,
       
  ],
  imports: [
    CommonModule,
    ChartModule
     
  ]
})
export class OverviewModule { }
