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
import { ConceptosComponent } from './conceptos.component';
import { PipesModule } from '../../pipes/pipes.module';




@NgModule({
  declarations: [
    ConceptosComponent,

     ],
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
    
  ]
})
export class ConceptosModule { }
