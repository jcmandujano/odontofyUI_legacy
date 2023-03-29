import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandingComponent } from './auth/landing/landing.component';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { interceptorProviders  } from './services/utils/interceptor.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import { NavBarComponent } from './nav-bar/nav-bar/nav-bar.component';
import { CrearPacientesComponent } from './pacientes/crear-pacientes/crear-pacientes.component';
import { ListaPacientesComponent } from './pacientes/lista-pacientes/lista-pacientes.component';
import {MatToolbarModule} from '@angular/material/toolbar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ForgotComponent,
    LandingComponent,
    DashboardComponent,
    NavBarComponent,
    CrearPacientesComponent,
    ListaPacientesComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatListModule
  ],
  providers: [interceptorProviders, { provide: MAT_DATE_LOCALE, useValue: 'es-MX' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
