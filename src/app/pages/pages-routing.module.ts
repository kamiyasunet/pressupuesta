import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ResumenComponent } from './resumen/resumen.component';
import { UsuarioAvanceComponent } from './usuario-avance/usuario-avance.component';
import { PaqueteComponent } from './paquete/paquete.component';
import { ActividadComponent } from './actividad/actividad.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { FasesComponent } from './fases/fases.component';
import { Fase1Component } from './fase1/fase1.component';
import { ConceptosComponent } from './conceptos/conceptos.component';
import { MatricesComponent } from './matrices/matrices.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'fases',
      component: FasesComponent,
    },
    {
      path: 'presupuesto',
      component: PresupuestoComponent,
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'actividad',
      component: ActividadComponent,
    },
    {
      path: 'actividades',
      component: ActividadesComponent,
    },
    {
      path: 'resumen',
      component: ResumenComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
   
    {
      path: 'usuario-avance/:id',
      component: UsuarioAvanceComponent,
    },
    {
      path: 'conceptos/:id/:idf',
      component: ConceptosComponent,
    },
    {
      path: 'fase1/:id',
      component: Fase1Component,
    },
    {
      path: 'matrices/:fases/:fase/:concepto',
      component: MatricesComponent,
    },
    {
      path: 'paquete/:id',
      component: PaqueteComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
