import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UsuarioAvanceModule } from './usuario-avance/usuario-avance.module';
import { PaqueteModule } from './paquete/paquete.module';
import { ResumenModule } from './resumen/resumen.module';
import { ActividadModule } from './actividad/actividad.module';



@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    UsuarioAvanceModule,
    PaqueteModule,
    ResumenModule,  
    
     
  ],
  declarations: [
    PagesComponent,
  
  ],
})
export class PagesModule {
}
