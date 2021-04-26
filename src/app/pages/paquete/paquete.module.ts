import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbStepperModule,
  NbUserModule} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { PaqueteComponent } from './paquete.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbwNnaZqeajWbczNw_uAWJFoM2gTUVTsA' 
    }),
    
    
  ],
  declarations: [
    PaqueteComponent
  ],
})
export class PaqueteModule { }
