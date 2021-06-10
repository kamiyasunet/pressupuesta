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
import { ActividadesModule } from './actividades/actividades.module';
import { PresupuestoModule } from './presupuesto/presupuesto.module';
import { FasesModule } from './fases/fases.module';
import { ConceptosModule } from './conceptos/conceptos.module';
import { PipesModule } from '../pipes/pipes.module';
import { MatricesModule } from './matrices/matrices.module';
import { Fase1Component } from './fase1/fase1.component';
import { Fase1Module } from './fase1/fase1.module';



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
    ActividadModule,
    ActividadesModule,
    PresupuestoModule,
    FasesModule,
    Fase1Module,
    ConceptosModule,
    MatricesModule,
  
  ],
  declarations: [
    PagesComponent,
    
  ],
})
export class PagesModule {
}
