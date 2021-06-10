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
import { FormsModule } from '@angular/forms';
import { MatricesComponent } from './matrices.component';
import { PipesModule } from '../../pipes/pipes.module';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { ModalOverlaysRoutingModule } from '../modal-overlays/modal-overlays-routing.module';



@NgModule({
  declarations: [MatricesComponent],
  imports: [
    CommonModule,
    NbAccordionModule,
    NbButtonModule,
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbUserModule,
    NbListModule,
    FormsModule,
    PipesModule,
    ModalOverlaysRoutingModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
 
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule
    
  ],
   exports: [
    RouterModule
  ]
})
export class MatricesModule { }
