import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './auth/landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearPacientesComponent } from './pacientes/crear-pacientes/crear-pacientes.component';
import { ListaPacientesComponent } from './pacientes/lista-pacientes/lista-pacientes.component';

const routes: Routes = [
  { path: '',
  //component: LandingComponent,
  component: ListaPacientesComponent,
  redirectTo: '',
  pathMatch: 'full'
 },
 { path: 'login', component: LoginComponent },
 { path: 'register', component: SignUpComponent },
 { path: 'dashboard', component: DashboardComponent },
 { path: 'crea-pacientes', component: CrearPacientesComponent},
 { path: 'pacientes', component: ListaPacientesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
