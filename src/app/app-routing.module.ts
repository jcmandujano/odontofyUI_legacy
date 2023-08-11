import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './auth/landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'pacientes', loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule) },
  { path: '',
  component: LandingComponent,
  redirectTo: '',
  pathMatch: 'full'
 },
 { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
